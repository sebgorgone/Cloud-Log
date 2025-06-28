import {useState} from 'react';
import {getPallette} from "../logInputWidget";
import '../style/loginScreen.css';

function DownloadPage(props) {

   const pallette = getPallette();

   const shell = {
      marginTop: "5em",
      marginLeft: "5em",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexFlow: "column"
   }
   
   const titleStyle= {
      fontFamily: "L1",
      fontSize: "2em",
      color: pallette[0],
      margin: "0",
   }

   return(
      <div style={shell}>
         <br />
         <img style={{width: '24em', aspectRatio: '4/1', paddingTop: "1em", marginRight: ".5em"}} src="/CloudLogBannerWhite.svg" />
         
         <div>
            <br />
            <br />
            <br />
            <p style={titleStyle}>This page is under construction</p>
         </div>
      </div>
   )

}

export default DownloadPage