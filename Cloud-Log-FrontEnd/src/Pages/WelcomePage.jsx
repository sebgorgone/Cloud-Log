import {useState} from 'react';
import {getPallette} from "../logInputWidget";
import '../style/loginScreen.css';

function WelcomePage(props) {
   console.log('in the welcome page');

   const shell = {
      marginTop: "5em",
      marginLeft: "5em"
   }

   return(
      <div style={shell}>
         <br />
         
         <p>Welcome Page</p>
      </div>
   )

}

export default WelcomePage

