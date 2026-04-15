import {useState, useEffect, useRef} from 'react';
import '../style/loginScreen.css';
import ResultsPage from './ResultsPage';
import { getPallette } from '../logInputWidget';

function SearchedList(props) {

   const svr = import.meta.env.VITE_SVR_URL;

   //environment
   const user = props.user;
   const wildCard = props.wildCard;
   const SEARCH_TIMEOUT_MS = Number(import.meta.env.VITE_SEARCH_TIMEOUT_MS) || 20000;

   const pallette = getPallette();

   //state

   const [page, setPage] = useState(0); 
   const [results, setResults] = useState([]);
   const [tagsMap, setTagsMap] = useState({});
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const requestCounter = useRef(0);
   const latestRequestRef = useRef({ requestId: null, startedAt: null });

   //handler 

   function handleNextPage () {
      setPage(prev => prev + 1);
   }

   function handlePrevPage () {
      setPage(prev => prev - 1);
   }

   //style

   const shell = {
      marginTop: "5em",
      marginLeft: "5em",
   }

   const textStyle = {
      textAlign: "center",
      fontFamily: "L1",
      fontSize: "2em",
      margin: "0",
      padding: "0",
   }

      const headerStyle = {
      textAlignLast: "center",
      fontFamily: "L1",
      fontSize:"30px",
      width: "89%",
      color: pallette[4],
      background: pallette[0],
      margin: "auto",
      marginTop: "3em",
      borderRadius: "1.5em",
      border: "none",
      padding: ".6em",

   }

   const pageNav={
      padding: "0",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center"
   }

   const pageButtonLeft = {
      color: pallette[1],
      background: pallette[4],
      borderRadius: "1em",
      border: "none",
      fontSize: ".8em",
      marginLeft: ".5em",
      fontFamily: "L1",
      height: "fit-content",
   }

   const pageButtonRight = {
      color: pallette[1],
      background: pallette[4],
      borderRadius: "1em",
      border: "none",
      fontSize: ".8em",
      marginLeft: "1em",
      fontFamily: "L1",
      height: "fit-content",
   }

   const pageNum = {
      fontFamily: "L1",
      fontSize: "1.75em",
      padding: ".3em",
      borderRadius: ".3em",
      color: pallette[0],
      // background: pallette[0],
      height: "fit-content",
   }


   //useEffect
   // When props.flag changes, reset page to 0 and fetch results
   useEffect(() => {
      setPage(0);
   }, [props.flag]);

   // Fetch results when page, user, or search term changes
   useEffect(() => {
      const term = (wildCard || '').trim();
      const Offset = page * 30;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
         controller.abort();
      }, SEARCH_TIMEOUT_MS);
      const requestIndex = ++requestCounter.current;
      const requestId = `${user.ID}-${Date.now()}-${requestIndex}`;
      const requestStartedAt = performance.now();
      latestRequestRef.current = { requestId, startedAt: requestStartedAt };

      console.log(JSON.stringify({
         scope: 'search',
         event: 'client_request_start',
         requestId,
         term,
         offset: Offset,
         page,
         timestamp: new Date().toISOString(),
      }));

      const getResults = async () => {
         if (!term) {
            setResults([]);
            setTagsMap({});
            setError('Enter a search term.');
            setLoading(false);
            clearTimeout(timeoutId);
            return;
         }

         setLoading(true);
         setError(null);
         setResults([]);
         setTagsMap({});

         try {
            const fetchStartedAt = performance.now();
            const response = await fetch(`${svr}/search`, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json'},
               body: JSON.stringify({user_id: user.ID, wildCard: term, offset: Offset, requestId}),
               signal: controller.signal,
            });
            const fetchMs = performance.now() - fetchStartedAt;

            console.log(JSON.stringify({
               scope: 'search',
               event: 'client_response_received',
               requestId,
               httpStatus: response.status,
               fetchMs,
               timestamp: new Date().toISOString(),
            }));

            if (requestIndex !== requestCounter.current) {
               console.log(JSON.stringify({
                  scope: 'search',
                  event: 'client_response_outdated',
                  requestId,
                  timestamp: new Date().toISOString(),
               }));
               return;
            }

            const parseStartedAt = performance.now();
            const data = await response.json();
            const parseMs = performance.now() - parseStartedAt;
            const totalClientMs = performance.now() - requestStartedAt;

            console.log(JSON.stringify({
               scope: 'search',
               event: 'client_response_parsed',
               requestId,
               parseMs,
               totalClientMs,
               serverTiming: data.timing || null,
               timestamp: new Date().toISOString(),
            }));

            if (data.ok) {
               const jumpHist = Array.isArray(data.results) ? [...data.results] : [];
               setResults(jumpHist);
               setTagsMap((data.tags && typeof data.tags === 'object') ? data.tags : {});
               if (jumpHist.length === 0) {
                  setError('No results found.');
               }
               console.log(JSON.stringify({
                  scope: 'search',
                  event: 'client_search_success',
                  requestId,
                  resultCount: jumpHist.length,
                  totalClientMs,
                  serverTotalMs: data?.timing?.totalMs,
                  timestamp: new Date().toISOString(),
               }));
               return;
            }

            setError(data.message || 'No results found.');
            setResults([]);
            setTagsMap({});
            console.error(JSON.stringify({
               scope: 'search',
               event: 'client_search_error_response',
               requestId,
               message: data.message || 'No results found.',
               totalClientMs,
               timestamp: new Date().toISOString(),
            }));
         } catch (err) {
            if (requestIndex !== requestCounter.current) {
               return;
            }

            const totalClientMs = performance.now() - requestStartedAt;

            if (err.name === 'AbortError') {
               setError('Search timed out. Please try again.');
               console.error(JSON.stringify({
                  scope: 'search',
                  event: 'client_search_timeout',
                  requestId,
                  timeoutMs: SEARCH_TIMEOUT_MS,
                  totalClientMs,
                  timestamp: new Date().toISOString(),
               }));
            } else {
               setError('Failed to load user jumps.');
               console.error(JSON.stringify({
                  scope: 'search',
                  event: 'client_search_network_error',
                  requestId,
                  message: err.message,
                  totalClientMs,
                  timestamp: new Date().toISOString(),
               }));
            }
            setResults([]);
            setTagsMap({});
         } finally {
            if (requestIndex === requestCounter.current) {
               setLoading(false);
            }
            clearTimeout(timeoutId);
         }
      };

      getResults();

      return () => {
         clearTimeout(timeoutId);
         controller.abort();
      };
   }, [page, props.flag, wildCard, user.ID, svr, SEARCH_TIMEOUT_MS]);

   useEffect(() => {
      if (loading || !latestRequestRef.current.requestId) {
         return;
      }

      const totalRenderMs = performance.now() - latestRequestRef.current.startedAt;
      console.log(JSON.stringify({
         scope: 'search',
         event: 'client_render_ready',
         requestId: latestRequestRef.current.requestId,
         totalRenderMs,
         resultCount: results.length,
         hasError: Boolean(error),
         timestamp: new Date().toISOString(),
      }));
   }, [loading, results.length, error]);


   console.log('in the Search Results', '  Search Term: ', props.wildCard, props.user, 'page: ', page);


   return(
      <div style={shell}>
         {wildCard !== "" ? <p style={headerStyle}>showing results for {props.wildCard}</p> : <p style={headerStyle}>enter searchd</p>}

         {loading && <p style={textStyle}>Loading...</p>}
         {error && <p style={{...textStyle, color: 'red'}}>{error}</p>}

         {!loading && !error && results.length > 0 && <p style={textStyle}>results: {results.length}</p>}

         {!loading && !error && results.length > 0 && <div style ={pageNav}>
            {page > 0 && <button style={pageButtonLeft} onClick={handlePrevPage}>Page {page}</button>}
            <p style={pageNum}>Page {page + 1}</p>
            {results.length >= 30 && <button style={pageButtonRight} onClick={handleNextPage}>Page {page + 2}</button>}
         </div>}

         {!loading && !error && (results.length > 0 ? <ResultsPage jumps={results} tagsMap={tagsMap} flag={props.flag} /> : <p style={textStyle}>no results</p>)}

         {!loading && !error && results.length > 0 && <div style ={pageNav}>
            {page > 0 && <button style={pageButtonLeft} onClick={handlePrevPage}>Page {page}</button>}
            <p style={pageNum}>Page {page + 1}</p>
            {results.length === 30 && <button style={pageButtonRight} onClick={handleNextPage}>Page {page + 2}</button>}
         </div>}
      </div>
   )

}

export default SearchedList