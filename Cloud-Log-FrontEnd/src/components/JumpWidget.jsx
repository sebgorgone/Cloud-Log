import {getPallette} from "../logInputWidget";
import { useState } from 'react';


function JumpWidget(props) {
   const pallette = getPallette();

   //state
   const [showNotes, setShowNotes] = useState();
   const [showSig, setShowSig] = useState();
   const [showTags, setShowTags] = useState();




   //inline
   const Shell = {
      background: pallette[4],
      borderRadius: ".4em",
      borderTopLeftRadius: "0em",
      border: "solid .1em",
      borderColor: pallette[0]

      

   }

   const section = {
      display: 'inline-block',
      paddingRight: "1em",
      borderRight: "solid .1em",
      borderColor: pallette[3],

   }

   const row = {
      display: "flex",
      justifyContent: "space-evenly",
      margin: ".2em",
      overflowX: "wrap"
   }

   const showButton= {
      fontFamily: "L1",
      fontSize: ".6em",
      border: "none",
      borderRadius: "1em",
      padding: ".3em",
      marginBottom: ".75em"

   }

   const header= {
      color: pallette[0],
      padding: "0",
      margin: "0",
      paddingLeft: ".2em",
      fontSize: ".85em",
   }

   const line = {
      border: "solid .2em",
      borderColor: pallette[3]
   }

   const properties = {
      padding: ".1em",
      margin: "0",
      color: pallette[0],
   }




   return(<div style={Shell} className="jumpWidget">

      <div style={row}>
         <div style={section}>
            <p style={header}>Jump Number: </p>
            <p style={properties}>{props.jumpNum}</p>
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

         <div style={section}>
            <p style={header}>Equipment: </p>
            <p style={properties}>{props.rig}</p>
         </div>

      </div>


      <div style={line}></div>


      <div style={row}>
         <div style={section}>
         <p style={header}>Exit Altitude(ft): </p>
         <p style={properties}>{props.exitAlt}</p>
      </div>

      <div style={section}>
         <p style={header}>Free Fall Time(s): </p>
         <p style={properties}>{props.time}</p>
      </div>

      <div style={section}>
         <p style={header}>Notes: </p>
         <button style={showButton}>Show Notes</button>
      </div>

      <div style={section}>
         <p style={header}>Signature: </p>
         <button style={showButton}>Show Signature</button>
      </div>

      <div style={section}>
         <p style={header}>Tags: </p>
         <button style={showButton}>show tags</button>
      </div>
      </div>

      {props.signature && props.signature.type === 'application/pdf' ? (
        <object
          data={URL.createObjectURL(props.signature)}
          type="application/pdf"
          width="100%"
          height="600px"
        >
          Your browser does not support embedded PDFs.
        </object>
      ) : (
        <p>No PDF to display</p>
      )}
      

   </div>)
}

export default JumpWidget;