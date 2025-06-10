import { getPallette } from "../logInputWidget"
import { useState, useEffect } from "react";


function WelcomeForm (props) {

   const data = props;


   //environment
   const pallette = getPallette();

   //state

  const [eqpmPage, setEqpmPage] = useState(true);

  const [aircraftPage, setAircraftPage] = useState(true);

  const [dzPage, setDzPage] = useState(true);

  const [planes, setPlanes] = useState(['No saved planes yet']);

  const [rigs, setRigs] = useState(['No saved rigs yet']);

//   const [DZs, setDZs] = useState(['No saved dropzones yet']);

//   const [addJumpDZ, setAddJumpDZ] = useState(null);

  const [addJumpAircraft, setAddJumpAircraft] = useState(null);

  const [addJumpRig, setAddJumpRig] = useState(null);

   //style

   const headerStyle = {
    fontFamily: "L1",
    fontSize: "1.2em",
    color: pallette[4],
    background: pallette[2],
    borderRadius: "1em",
    padding: "0",
   };

   const headerButtonStyle = {
    background: pallette[0],
    border: "solid",
    borderColor: pallette[4],
    borderRadius: "1.5vw",
    padding: "0",
    margin: "0",
    fontFamily: "L1",
    color: pallette[4],
   };

   const listStyle = {
   fontFamily: "L1",
   fontSize: "1.5em",
   padding: "none",
   }

   const formStyle= {
   display: "block",
   padding: "none"
   }

   const rowStyle = {
    display: "flex", 
    justifyContent: "space-around", 
    margin: "1vh", padding: "1em", 
    background: pallette[3], 
    borderRadius:".3em" 
   };

   const inputSection = {
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-evenly"
   };


   //api
     const getRigs = async () => {
      console.log('storing string value', addJumpRig)
    try {
      const response = await fetch('http://localhost:5009/getrigs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: props.user.ID}),
      });
      const returnedData = await response.json();
      if(response.ok){
        let foundRigs = [];
        for (let rig of returnedData.results) {
          foundRigs.push(rig.name);
        }
        setRigs([...foundRigs]);
      } else{
        console.error('no rigs imported', response);
      }
    } catch (err) {
      console.error('client failed getting rigs', err);
    }
  };

   const storeRig = async () => {
    try {
      const response = await fetch('http://localhost:5009/storerigs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: data.user.ID, name: addJumpRig }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
        alert(returnedDATA.message)
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing rig', err);}
  };

  const getPlanes = async () => {
    try {
      const response = await fetch('http://localhost:5009/getplanes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: data.user.id}),
      });
      const returnedData = await response.json();
      if(response.ok){
        let foundPlanes = [];
        for (let plane of returnedData.results) {
          foundPlanes.push(plane.name);
        }
        setPlanes([...foundPlanes]);
      } else{
        console.error('no Planes imported', response);
      }
    } catch (err) {
      console.error('client failed plane rigs', err)
    }
  };

  const storePlane = async () => {
    try {
      const response = await fetch('http://localhost:5009/storeplanes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: data.user.id, name: planes }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
        alert(returnedDATA.message)
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing plane', err);}
  }

  //rendered lists

  const planeList = planes.map((plane, index) => 
    <div key={index}>
    <p style={listStyle}>{plane}</p>
  </div>
  );

  const rigList = rigs.map((rig, index) => 
    <div key={index}>
      <p style={listStyle}>{rig}</p>
    </div>
  );

//   const DZList = DZs.map((DZ, index) => 
//     <div key={index}>
//       <p>{DZ}</p>
//       <label htmlFor={`DZ-${index}`}>{DZ}</label>
//     </div>
//   )



  //event handlers

   function handleEquipmentForm() {
    setDzPage(true);
    setAircraftPage(true);
    setEqpmPage(!eqpmPage);
  }

  function handleAircraftForm() {
    setDzPage(true);
    setEqpmPage(true);
    setAircraftPage(!aircraftPage);
  }

//   function handleDzForm() {
//     setEqpmPage(true);
//     setAircraftPage(true);
//     setDzPage(!dzPage);
//   }

//   function handleAddJumpDZChange (e) {
//     setAddJumpDZ(e.target.value);
//   }

  function handleAddJumpAircraftChange (e) {
    setAddJumpAircraft(e.target.value);
  }

  function handleAddJumpRigChange (e) {
    setAddJumpRig(e.target.value);
  }

//   function handleDZInput (e) {
//     e.preventDefault()
//     if (addJumpDZ.trim() !== ""){
//       storeDZ(addJumpDZ)
//       getDZs();
//       setAddJumpDZ("")
//     }
//   }

  function handleAircraftInput (e) {
    e.preventDefault()
    if (addJumpAircraft.trim() !== ""){
      storePlane(addJumpAircraft);
      getPlanes();
      setAddJumpAircraft("");
    }
  }

  function handleRigInput (e) {
    e.preventDefault()
    if (addJumpRig.trim() !== ""){
      storeRig();
      getRigs();
      setAddJumpRig("");
    }

  }

  //useEffect



  useEffect(() => {
                     getRigs();
                     // getPlanes();
                  }, []);


   return(
      <div>


         <div style={rowStyle}>
            <div style={inputSection}>

               <button style={headerButtonStyle} onClick={handleEquipmentForm}>Equipment{eqpmPage ? ' (show)' : ' (hide)'}</button>
               <form style ={eqpmPage ? {display: "none"} : {formStyle}}>
               {rigList}
               <div>
                  <input 
                     type="text" 
                     placeholder="new rig"
                     value={addJumpRig}
                     onChange={handleAddJumpRigChange}
                  />
                  <button style={headerButtonStyle} onClick={handleRigInput}>Add Rig</button>
               </div>
               </form>
            </div>

            <div style={inputSection}>
               <button onClick={handleAircraftForm}style={headerButtonStyle}>Aircraft{aircraftPage ? ' (show)' : ' (hide)'}</button>
               <form style={!aircraftPage ? formStyle : {display: "none"}}>

                  <p style={headerStyle}>
                    select your aircraft 
                  </p>

                  {planeList}

                  <div>
                    <input 
                      type="text" 
                      placeholder="New Aircraft" 
                      value={addJumpAircraft}
                      onChange={handleAddJumpAircraftChange}
                    /> 
                    <button style={headerButtonStyle} onClick={handleAircraftInput}>Add Aircraft</button>
                  </div>

               </form>
            </div>

         </div>


      </div>
   )
}

export default WelcomeForm