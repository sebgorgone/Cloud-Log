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
    border: "none",
    borderRadius: "1.5em",
    padding: ".5em",
    margin: "2em",
    fontFamily: "L1",
    fontSize: "1.2em",
    color: pallette[0],
   };

   const rowStyle = {
    display: "flex", 
    flexWrap: "wrap",
    justifyContent: "space-around", 
    margin: "1em", padding: "1em", 
 
    border: "none",
    borderRadius: '1em'
   };

   const inputSection = {
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-evenly",
   };

   return(
   <div style={rowStyle}>

      <div style={inputSection}>

         <button style={headerButtonInputStyle} onClick={logbook}>View LogBook</button>

         <button style={headerButtonInputStyle} onClick={statspage}>View Stats</button>

      </div>


   </div>)
}

export default NavForm