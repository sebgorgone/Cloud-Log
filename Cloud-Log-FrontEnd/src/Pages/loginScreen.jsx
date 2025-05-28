// import {useState} from 'react';
import {getPallette} from "../logInputWidget"


function loginScreen () {
   const pallette = getPallette()
   console.log("LOGIN PALLETTE:" + [...pallette])
   const loginContainer = {
      background: pallette[2],
      padding: "1vw",
      maxWidth: "75%",
      margin: "auto",
   }

   const headerStyle = {
      fontFamily: "L1",
   }

   return(
      <div style={loginContainer}>
         <h3 style={headerStyle}>Please Log In</h3>

      </div>
   )
}

export default loginScreen;