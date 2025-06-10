import {useState, useEffect} from 'react';
import '../style/loginScreen.css';
import ResultsPage from './ResultsPage';
import { getPallette } from '../logInputWidget';

function SearchedList(props) {
   //environment
   console.log('in the Search Results', '  Search Term: ', props.wildCard, props.user);
   const user = props.user;
   const wildCard = props.wildCard;

   const pallette = getPallette();

   //state

   const [results, setResults] = useState('loading...');

   console.log('results: ', results);

   const getResults = async () => { 
      console.log('getting search results')
      try {
         const response = await fetch('http://localhost:5009/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({user_id: user.ID, wildCard: wildCard}),
         });
         const data = await response.json();
         if(data.ok){
            let jumpHist = [];
            for (let jump of data.results) {
               jumpHist.push(jump);
            }

            setResults(jumpHist);
            console.log(data.message)
               
         }
         else {
            console.error('jumps not found', data)
         }
      } catch (err) {
         console.error('client failed to load user jumps')
      }
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

   //useEffect
   useEffect(() => {
      getResults();
   }, [props.flag]);
   return(
      <div style={shell}>


         {wildCard !== "" ? <p style={headerStyle}>showing results for {props.wildCard}</p> : <p style={headerStyle}>enter search</p>}
         {results.length > 0 && <p style={textStyle}>results: {results.length}</p>}

         {Array.isArray(results) ? results.length > 0 ? <ResultsPage jumps={results} /> : <p style={textStyle}>no results</p>: <p style={textStyle}>loading</p>}
      </div>
   )

}

export default SearchedList