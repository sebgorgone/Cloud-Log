import {getPallette} from "../logInputWidget";
import { useState } from 'react';


function JumpWidgetDisp(props) {



   const pallette = getPallette();


   //state
   const [showNotes, setShowNotes] = useState(false);
   const [showSig, setShowSig] = useState(false);
   const [showTags, setShowTags] = useState(false);



   //handlers

   function handleSigPreview(e) {
      e.preventDefault();
      setShowSig(!showSig);
   }

   function handleNotesPreview(e) {
      e.preventDefault()
      setShowNotes(!showNotes);
   }

   function handleEdit (e) {
      e.preventDefault();
      props.edit();
   }

   //inline
   const Shell = {
      background: pallette[4],
      borderRadius: ".4em",
      borderTopLeftRadius: "0em",
      border: "solid .2em",
      borderColor: pallette[1],
      width: "96.5%",
      borderRadius: ".75em"

      

   }

   const section = {
      display: 'inline-block',
      paddingRight: "1em",
      margin: "0",
      borderRight: "solid .1em",
      borderColor: pallette[3],

   }

   const row = {
      margin: "0",
      display: "flex",
      justifyContent: "space-evenly",
      margin: ".1em",
      flexWrap: "wrap"
   }

   const showButton= {
      fontFamily: "L1",
      fontSize: ".5em",
      border: "none",
      borderRadius: "1em",
      padding: ".3em",
      marginBottom: ".75em"

   }

   const header= {
      color: pallette[2],
      padding: "0",
      paddingLeft: ".2em",
      fontSize: ".55em",
   }

   const line = {
      border: "solid .3em",
      margin: "0",
      borderColor: pallette[3]
   }

   const properties = {
      padding: ".1em",
      margin: "0",
      color: pallette[0],
      fontSize: ".75em",
   }

   const numProp = {
      padding: ".1em",
      margin: "0",
      color: pallette[1],
      fontSize: "1.25em",
   }

   const nestedOk = {
      border: "none",
      fontSize: "1em",
      fontFamily: "L1",
      borderRadius: "1em",
      padding: "0",
      paddingBottom: ".15em",
      margin: "1em",
      background: pallette[1],
      color: pallette[4],
      width: "7em"
   }



   return(<div style={Shell} className="jumpWidget">

      <div style={row}>
         <div style={section}>
            <p style={header}>Jump Number: </p>
            <p style={numProp}>{props.jumpNum}</p>
         </div>

         <div style={section}>
            <p style={header}>Jump Date: </p>
            <p style={properties}>{props.jumpDate}</p>
         </div>

         <div style={section}>
            <p style={header}>Dropzone: </p>
            <p style={properties}>{props.dz}</p>
         </div>

         <div style={section}>
            <p style={header}>Aircraft: </p>
            <p style={properties}>{props.aircraft}</p>
         </div>

         

      </div>


      <div style={line}></div>

         
      <div style={row}>

         <div style={section}>
            <p style={header}>Equipment: </p>
            <p style={properties}>{props.rig}</p>
         </div>


         <div style={section}>
            <p style={header}>Exit Altitude (ft): </p>
            <p style={properties}>{props.exitAlt}</p>
         </div>

         <div style={section}>
            <p style={header}>Free Fall Time (s): </p>
            <p style={properties}>{props.time}</p>
         </div>

         <div style={section}>
            <p style={header}>Notes: </p>
            <button style={showButton} onClick={handleNotesPreview}>{showNotes ? "Hide" : "Show Notes"}</button>
         </div>

         <button style={nestedOk} onClick={handleEdit}>edit</button>

      </div>
      {/* Dropdown */}
            
      <div style={showNotes ? line : {display : "none"}}></div>
      <div style={showNotes ? row : {display: "none"}}>
         <h4 style={{color: pallette[0], fontSize: "1.6em", margin: "0",display: "flex",flexFlow: "column", justifyContent: "center"}}>Notes:</h4> 
         <p style={{color: pallette[0], fontSize: "1.1em", padding: ".05em"}}>{props.notes}</p>
      </div>
      

   </div>)
}

export default JumpWidgetDisp;