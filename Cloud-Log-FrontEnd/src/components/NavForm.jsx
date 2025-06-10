import { getPallette } from "../logInputWidget";

function NavForm(props) {

   const logbook = props.logs;

   const statspage = props.stats;

   //handlers


   //style

   const pallette = getPallette();

   const headerButtonInputStyle = {
    background: pallette[4],
    width: "min(600px,50vw)",
    border: ".1em solid",
    borderColor: pallette[0],
    borderRadius: "1.5vw",
    padding: ".5em",
    margin: "1em",
    fontFamily: "L1",
    fontSize: "1.2em",
    color: pallette[0],
   };


   const textSection = {
      width: "100%",
      textAlign: "center",
      margin: "1em"
   }

   const subTitle = {      
      fontSize:"min(5vw, 200px)",
      width: "80%",
      fontFamily: "L1",
      color: pallette[4],
      background: pallette[0],
      margin: "auto",
      textAlign: "center",
      borderRadius: "1.5em",
      border: "none",
      padding: ".3em",
      paddingBottom: ".1em"
   }

   const rowStyle = {
    display: "flex", 
    flexWrap: "wrap",
    justifyContent: "space-around", 
    margin: "1vh", padding: "1em", 
    background: pallette[3], 
    borderRadius:".3em",
    border: ".25em solid",
    borderColor: pallette[0]
   };

   const inputSection = {
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-evenly",
   };

   return(
   <div style={rowStyle}>

      <div style={textSection}><p style={subTitle}>View your Jumps</p></div>


      <div style={inputSection}>

         <button style={headerButtonInputStyle} onClick={logbook}>View LogBook</button>

         <button style={headerButtonInputStyle} onClick={statspage}>View Stats</button>

      </div>


   </div>)
}

export default NavForm