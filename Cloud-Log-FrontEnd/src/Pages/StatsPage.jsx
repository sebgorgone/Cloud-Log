import {useState} from 'react';
import {getPallette} from "../logInputWidget";
import '../style/loginScreen.css';

function StatsPage(props) {
   console.log('in the Stats page');

   const shell = {
      marginTop: "5em",
      marginLeft: "5em"
   }

   return(
      <div style={shell}>
         <p>Stats Page</p>
      </div>
   )

}

export default StatsPage