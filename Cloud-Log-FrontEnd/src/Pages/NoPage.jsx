import { getPallette } from "../logInputWidget";
import { useNavigate } from "react-router-dom";

function NoPage () {

   const nav = useNavigate();

   const pallette = getPallette();

   const shell = {
      display: "flex",
      flexFlow: "column",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      background: pallette[2],
      borderTop: "solid 5vh",
      borderColor: pallette[3]
   }

   const titleStyle= {
      fontFamily: "L1",
      fontSize: "4em",
      color: pallette[0],
      margin: "0",
   }

   const aStyle= {
      display: "flex",
      alignItems: "center",
      fontFamily: "L1",
      fontSize: "3em",
      color: pallette[4],
      border: "none",
      background: pallette[1],
      paddingLeft: ".6em",
      paddingRight: ".6em",
      borderRadius: "1.5em",
      marginBottom: "1em"
   }

   return (
      <div style={shell}>

         <img style={{width: '16em', aspectRatio: '4/1', paddingTop: ".1em", marginRight: ".5em"}} src="/CloudLogBannerWhite.svg" />
         
         <div style={{display: "flex", flexFlow: "column", alignItems: "center", padding: "0"}}>
            <img style={{aspectRatio: "4/4", height: "40vh"}} src="/cloudlog404White.svg" />
            <p style={{fontFamily: "L1",fontSize: "6em", color: pallette[0], padding: "0", margin: "0"}}>404</p>
            <p style={titleStyle}>Page not found</p>
         </div>
         <button style={aStyle} onClick={() => nav('/login')}><img style={{width: '1.5em', height: '1.5em', paddingTop: ".1em", marginRight: ".5em"}} src="/CloudLogLogo.svg" />Go To Login →</button>
      </div>
   )
}

export default NoPage