import {useState} from 'react';
import {getPallette} from "../logInputWidget";
import '../style/loginScreen.css';

function SettingsPage(props) {
   console.log('in the Settings page');

   const shell = {
      marginTop: "5em",
      marginLeft: "5em"
   }

   return(
      <div style={shell}>
         <p>Settings Page</p>
      </div>
   )

}

export default SettingsPage