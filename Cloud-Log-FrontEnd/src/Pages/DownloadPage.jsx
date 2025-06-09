import {useState} from 'react';
import {getPallette} from "../logInputWidget";
import '../style/loginScreen.css';

function DownloadPage(props) {
   console.log('in the Download page');

   const shell = {
      marginTop: "5em",
      marginLeft: "5em"
   }

   return(
      <div style={shell}>
         <br />


         <p>Download Page</p>
      </div>
   )

}

export default DownloadPage