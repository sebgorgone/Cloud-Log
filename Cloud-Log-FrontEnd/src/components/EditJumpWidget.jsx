import {getPallette} from "../logInputWidget";
import { useState } from 'react';


function EditJumpWidget(props) {

   // console.log(props)




   const pallette = getPallette();


   //state
   const [showNotes, setShowNotes] = useState(false);

   const [newNum, setNewNum] = useState('');
   const [newDate, setNewDate] = useState(null);
   const [newDZ, setNewDZ] = useState(null);
   const [newPlane, setNewPlane] = useState(null);
   const [newRig, setNewRig] = useState(null);
   const [newAlt, setNewAlt] = useState('');
   const [newT, setNewT] = useState('');
   const [newNote, setNewNote] = useState('');

   const [dzField, setDzField] = useState(false);
   const [planeField, setPlaneField] = useState(false);
   const [rigField, setRigField] = useState(false);


   //handlers

   function handleNotesPreview(e) {
      e.preventDefault()

      setDzField(false);
      setRigField(false);
      setPlaneField(false);

      setShowNotes(!showNotes);
   }

   function handleJNChange (e) {
      setNewNum(e.target.value);
      console.log(newNum)
   }
   function handleJDChange (e) {
      setNewDate(e.target.value);
   }
   function handleAltChange (e) {
      setNewAlt(e.target.value);
   }
   function handleTChange (e) {
      setNewT(e.target.value);
   }
   function handleNChange (e) {
      setNewNote(e.target.value);
   }




   function handleSetNewAircraft (plane) {
      setNewPlane(plane);
   }

   function handleCancleNewAircraft(e) {
      e.preventDefault()
      setNewPlane(null);
   }

   function handleSetNewDZ (DZ) {
      setNewDZ(DZ);
   }

      function handleCancleNewDZ(e) {
      e.preventDefault()
      setNewDZ(null);
   }

   function handleSetNewRig (rig) {
      setNewRig(rig)
   }

      function handleCancleNewRig(e) {
      e.preventDefault()
      setNewRig(null);
   }





   function handleAircraftField (e) {
      e.preventDefault();

      setShowNotes(false);

      setDzField(false);
      setRigField(false);

      setPlaneField(true);
   }

   function handleAircraftCancel (e) {
      e.preventDefault();
      setPlaneField(false);
   }

   function handleDZField (e) {
      e.preventDefault();

      setShowNotes(false);

      setRigField(false);
      setPlaneField(false);

      setDzField(true);
   }

   function handleDZCancel (e) {
      e.preventDefault();
      setDzField(false);
   }

   function handleRigField (e) {
      e.preventDefault();

      setShowNotes(false);

      setPlaneField(false);
      setDzField(false);

      setRigField(true);
   }

   function handleRigCancel (e) {
      e.preventDefault();
      setRigField(false);
   }



   function handleSubmit (e) {
      e.preventDefault();
      if (
         newNum === '' &&
         newDate === null &&
         newDZ === null &&
         newPlane === null &&
         newRig === null &&
         newAlt === '' &&
         newT === '' &&
         newNote === ''
      ) return alert('no changes made')

      let writeNum = props.jumpNum;
      let writeDate = props.jumpDate;
      let writeDZ = props.dz;
      let writePlane = props.aircraft;
      let writeRig = props.rig;
      let writeAlt = props.exitAlt;
      let writeT = props.time;
      let writeNote = props.notes;
      let ID = props.jump_id;

      if (newNum !== '') writeNum = newNum;
      if (newDate){
         if (newDate.length === 10) writeDate = newDate;
      }
      if (newDZ !== null) writeDZ = newDZ;
      if (newPlane !== null) writePlane = newPlane;
      if (newRig !== null) writeRig = newRig;
      if (newAlt !== '') writeAlt = newAlt;
      if (newT !== '') writeT = newT;
      if (newNote !== '') writeNote = newNote;


   if (writeNum <= 0){
      return alert('Jump Number is missing or invalid');
    };
    if (writeDate === null){
      return alert('Jump Date is missing or invalid');
    };
    if (writeDZ === null){
      return alert('Dropzone is missing');
    };
    if (writePlane === null){
      return alert('Aircraft is missing');
    };
    if (writeRig === null){
      return alert('Rig is missing');
    };
    if (writeAlt < 1){
      return  alert('Exit Altitude is missing or invalid, make sure you are not using commas.');
    };
    if (writeT < 1){
      return alert('Free Fall Time is missing or invalid')
    };

      writeChanges(writeNum, writeDate, writeDZ, writePlane, writeRig, writeAlt, writeT, writeNote, ID)

   }

   const writeChanges = async (n, d, dz, p, r, a,t, note, id)  => {
      console.log('setting new values for number: ', n, ' date: ', d, ' dz: ', dz, 'plane: ', a, ' rig: ', r, ' alt: ', a, 't: ', t, ' notes: ', note, ' userID: ', id );
      
    try {
    const response = await fetch('http://localhost:5009/editjump', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jump_id: id,
        jump_num: n,
        jump_date: d,
        dz: dz,
        aircraft: p,
        equipment: r,
        alt: a,
        t: t,
        notes: note,
      })
    });
    const responseData = await response.json();
    if(responseData.ok){
      alert(responseData.message);
      props.rst()
      // Notify parent to reload after successful storage
    } else {
      alert(responseData.message);
      console.error(responseData.error)

    }
  } catch (err) {console.error('client failed editing jump', err);}
   }

   //inline
   const Shell = {
      background: pallette[4],
      borderRadius: ".4em",
      borderTopLeftRadius: "0em",
      border: "solid .2em",
      borderColor: pallette[1],
      maxWidth: "97%",
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
      margin: ".2em",
      flexWrap: "wrap"
   }

   const showButton= {
      fontFamily: "L1",
      fontSize: ".7em",
      border: "none",
      borderRadius: "1.5em",
      padding: ".5em",
      marginBottom: ".75em",
      background: pallette[3],
      color: pallette[0]

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
      marginBottom: ".5em",
      color: pallette[0],
      fontSize: ".75em",
   }

   const numProp = {
      padding: ".1em",
      margin: "0",
      color: pallette[1],
      fontSize: "1.25em",
   }

   const newProp = {
      padding: ".1em",
      color: 'red',
      fontSize: "1.25em",
   }

   const inputStyle = {
      width: "100%",
      fontFamily: "L1",
      fontSize: ".8em",
      padding: ".2em",
      textAlign: "center",
      margin: "0",
      marginBottom: ".5em",
      background: pallette[3],
      color: pallette[0],
      border: "solid .1em",
      borderColor: pallette[0],
   }

   const favoriteButtonNull = {
    height: "fit-content",
    background: pallette[2],
    border: "none",
    padding: ".7em",
    paddingTop: ".3em",
    paddingBottom: ".4em",
    borderRadius: "3em",
    marginLeft: ".1em",
  }

  const favoriteButtonTrue = {
    height: "fit-content",
    background: pallette[3],
    boxShadow: "none",
    border: "none",
    padding: ".6em",
    paddingTop: ".35em",
    paddingBottom: ".45em",
    borderRadius: "3em",
    marginLeft: ".1em",
  }

  const listDiv = {
    display: "flex", 
    alignItems: "center", 
    justifyContent: "space-between", 
    width: "90%", 
    borderRadius: "1em", 
    background: pallette[0], 
    paddingRight: "1em", 
    margin: ".3em"
  }

  const rlStyle = {
   fontFamily: "L1",
   fontSize: ".7em",
   paddingLeft: ".7em",
   paddingBottom: "0em",
   color: pallette[3]
   }

   const nestedButtonCancel = {
      border: "none",
      fontSize: ".6em",
      fontFamily: "L1",
      borderRadius: "1em",
      paddingBottom: ".4em",
      background: pallette[3],
      color: pallette[1],
      marginLeft: ".6em",
      marginBottom: "1.6em",
      width: "6em"
   }

      const nestedOk = {
      border: "none",
      fontSize: "1em",
      fontFamily: "L1",
      borderRadius: "1em",
      paddingBottom: ".15em",
      margin: "1.5em",
      background: pallette[1],
      color: pallette[4],
      width: "65%"
   }

   //rendered lists

   const planeList = props.planeList.map((plane, index) => 
      plane !== props.aircraft && <div key={index} style={listDiv}>
         <p style={rlStyle}>{plane}</p>
         {plane !== 'No saved planes yet' && plane !== newPlane ? 
            <button type="button" style={favoriteButtonNull} onClick={() => handleSetNewAircraft(plane)}>
               +
            </button> 
            : 
            <button onClick={handleCancleNewAircraft} style={favoriteButtonTrue}>✓</button>
         }
      </div>
   );

   const rigList = props.rigList.map((rig, index) => 
      rig !== props.rig && <div key={index} style={listDiv}>
         <p style={rlStyle}>{rig}</p>
         {rig !== 'No saved rigs yet' && rig !== newRig ? 
            <button type="button" style={favoriteButtonNull} onClick={() => handleSetNewRig(rig)}>
               +
            </button> 
            : 
            <button onClick={handleCancleNewRig} style={favoriteButtonTrue}>✓</button>
         }
      </div>
   );

   const dzList = props.dzList.map((dz, index) => 
      dz !== props.dz && <div key={index} style={listDiv}>
         <p style={rlStyle}>{dz}</p>
         {dz !== 'No saved dropzones yet' && dz !== newDZ ? 
            <button type="button" style={favoriteButtonNull} onClick={() => handleSetNewDZ(dz)}>
               +
            </button> 
            : 
            <button onClick={handleCancleNewDZ} style={favoriteButtonTrue}>✓</button>
         }
      </div>
   );

   return(<div style={Shell} className="jumpWidget">

      <div style={row}>
         <div style={section}>
            <p style={header}>Jump Number: </p>
            <p style={numProp}>{props.jumpNum}</p>
            {newNum && newNum != props.jumpNum && <p style={properties}>→<span style={newProp}>{newNum}</span></p>}
            <input 
               type="number"
               style={inputStyle}
               placeholder={`Change num ${props.jumpNum}`}
               onChange={handleJNChange}
               value={newNum}
            />
         </div>

         <div style={section}>
            <p style={header}>Jump Date: </p>
            <p style={properties}>{props.jumpDate}</p>
            {newDate && newDate !== props.jumpDate.slice(0,10) && <p style={properties}>→<span style={newProp}>{newDate}</span></p>}
            <input 
               type="date"
               style={inputStyle}
               onChange={handleJDChange}
               value={newDate}
            />
         </div>

         <div style={section}>
            <p style={header}>Dropzone: </p>
            <p style={properties}>{props.dz}</p>
            {newDZ && newDZ !== props.dz && <p style={properties}>→<span style={newProp}>{newDZ}</span></p>}
            {!dzField && 
               <button style={showButton} onClick={handleDZField}>Edit DZ</button>
            }
            {dzField && dzList}
            {dzField &&
               <button style={nestedButtonCancel} onClick={handleDZCancel}>close</button>
            }
         </div>

         <div style={section}>
            <p style={header}>Aircraft: </p>
            <p style={properties}>{props.aircraft}</p>
            {newPlane && newPlane !== props.aircraft && <p style={properties}>→<span style={newProp}>{newPlane}</span></p>}
            {!planeField && 
               <button style={showButton} onClick={handleAircraftField}>Edit Aircraft</button>
            }
            {planeField && planeList}
            {planeField &&
               <button style={nestedButtonCancel} onClick={handleAircraftCancel}>close</button>
            }
         </div>

         

      </div>


      <div style={line}></div>


      <div style={row}>
         <div style={section}>
            <p style={header}>Equipment: </p>
            <p style={properties}>{props.rig}</p>
            {newRig && newRig !== props.rig && <p style={properties}>→<span style={newProp}>{newRig}</span></p>}
            {!rigField && 
               <button style={showButton} onClick={handleRigField}>Edit Rig</button>
            }
            {rigField && rigList}
            {rigField &&
               <button style={nestedButtonCancel} onClick={handleRigCancel}>close</button>
            }
            
         </div>

         <div style={section}>
            <p style={header}>Exit Altitude (ft): </p>
            <p style={properties}>{props.exitAlt}</p>
            {newAlt && newAlt != props.exitAlt && <p style={properties}>→<span style={newProp}>{newAlt}</span></p>}
            <input 
               type="number"
               style={inputStyle}
               placeholder={`Change Alt ${props.exitAlt}`}
               onChange={handleAltChange}
               value={newAlt}
            />
         </div>

         <div style={section}>
            <p style={header}>Free Fall Time (s): </p>
            <p style={properties}>{props.time}</p>
            {newT && newT != props.time && <p style={properties}>→<span style={newProp}>{newT}</span></p>}
            <input 
               type="number"
               style={inputStyle}
               placeholder={`Change Duration ${props.jumpNum}`}
               onChange={handleTChange}
               value={newT}
            />
         </div>

         <div style={section}>
            <p style={header}>Notes: </p>
            <button style={showButton} onClick={handleNotesPreview}>{showNotes ? "Hide" : "Edit Notes"}</button>
            
         </div>


      {/* <div style={section}>
         <p style={header} >Tags: </p>
         <button style={showButton} onClick={handleTagsPreview}>{showTags ? "hide" : "Show Tags"}</button>
      </div> */}

      </div>
      {/* Dropdown */}
            
      {/* <div style={showNotes ? line : {display : "none"}}></div> */}
      <div style={showNotes ? row : {display: "none"}}>
         <h4 style={{color: pallette[0], fontSize: "1.6em", margin: "0",display: "flex",flexFlow: "column", justifyContent: "center"}}>Notes:</h4> 
         <p style={{color: pallette[0], fontSize: "1.1em", padding: ".05em"}}>{props.notes ? props.notes : "no notes"}</p>
         
      </div>
      {showNotes && 
      <div style={{width: "100%",display: "flex", justifyContent: "center", margin: "auto", alignItems: "center"}}>
         <input 
            type="text"
            style={inputStyle}
            placeholder='change notes'
            onChange={handleNChange}
            value={newNote}
         />
      </div>}
      {newNote && newNote != props.notes && <p style={properties}>{!!!showNotes && 'EDITED NOTE '}→<span style={newProp}>{newNote}</span></p>}

      <div style={line}></div>   

      <div style={{width: "100%",display: "flex", justifyContent: "center", margin: "auto", alignItems: "center"}}>
         <button style={nestedOk} onClick={handleSubmit}>Submit Changes</button>
      </div>
      
   </div>)
}

export default EditJumpWidget;