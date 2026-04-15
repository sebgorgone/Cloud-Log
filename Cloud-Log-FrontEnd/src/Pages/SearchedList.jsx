import {useState, useEffect, useRef} from 'react';
import '../style/loginScreen.css';
import ResultsPage from './ResultsPage';
import { getPallette } from '../logInputWidget';

function SearchedList(props) {

   const svr = import.meta.env.VITE_SVR_URL;

   //environment
   const user = props.user;
   const wildCard = props.wildCard;
   const SEARCH_TIMEOUT_MS = Number(import.meta.env.VITE_SEARCH_TIMEOUT_MS) || 10000;

   const pallette = getPallette();

   //state

   const [page, setPage] = useState(0); 
   const [results, setResults] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const requestCounter = useRef(0);

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
      const requestId = ++requestCounter.current;

      const getResults = async () => {
         if (!term) {
            setResults([]);
            setError('Enter a search term.');
            setLoading(false);
            clearTimeout(timeoutId);
            return;
         }

         setLoading(true);
         setError(null);
         setResults([]);

         try {
            const response = await fetch(`${svr}/search`, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json'},
               body: JSON.stringify({user_id: user.ID, wildCard: term, offset: Offset}),
               signal: controller.signal,
            });

            if (requestId !== requestCounter.current) {
               return;
            }

            const data = await response.json();
            if (data.ok) {
               const jumpHist = Array.isArray(data.results) ? [...data.results] : [];
               setResults(jumpHist);
               if (jumpHist.length === 0) {
                  setError('No results found.');
               }
               console.log(data.message)
               return;
            }

            setError(data.message || 'No results found.');
            setResults([]);
            console.error('jumps not found', data)
         } catch (err) {
            if (requestId !== requestCounter.current) {
               return;
            }

            if (err.name === 'AbortError') {
               setError('Search timed out. Please try again.');
            } else {
               setError('Failed to load user jumps.');
            }
            setResults([]);
            console.error('client failed to load user jumps', err)
         } finally {
            if (requestId === requestCounter.current) {
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

         {!loading && !error && (results.length > 0 ? <ResultsPage jumps={results} flag={props.flag} /> : <p style={textStyle}>no results</p>)}

         {!loading && !error && results.length > 0 && <div style ={pageNav}>
            {page > 0 && <button style={pageButtonLeft} onClick={handlePrevPage}>Page {page}</button>}
            <p style={pageNum}>Page {page + 1}</p>
            {results.length === 30 && <button style={pageButtonRight} onClick={handleNextPage}>Page {page + 2}</button>}
         </div>}
      </div>
   )

}

export default SearchedList