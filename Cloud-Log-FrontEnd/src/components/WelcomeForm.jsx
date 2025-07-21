import { getPallette } from "../logInputWidget"
import { useState, useEffect } from "react";


function WelcomeForm (props) {
  const svr = import.meta.env.VITE_SVR_URL;

   const data = props;


   //environment
   const pallette = getPallette();

   const favoriteIcon = <img style={{width: "1.5em", marginRight: "1.15em"}} src="/favorite-svgrepo-com.svg" />

   //state

  const [eqpmPage, setEqpmPage] = useState(true);

  const [aircraftPage, setAircraftPage] = useState(true);

  const [dzPage, setDzPage] = useState(true);

  const [planes, setPlanes] = useState(['No saved planes yet']);

  const [rigs, setRigs] = useState(['No saved rigs yet']);

  const [DZs, setDZs] = useState(['No saved dropzones yet']);

  const [addJumpDZ, setAddJumpDZ] = useState(null);

  const [addJumpAircraft, setAddJumpAircraft] = useState(null);

  const [addJumpRig, setAddJumpRig] = useState(null);



  const [defaultRig, setDefualtRig] = useState(null);

  const [defaultAircraft, setDefaultAircraft] = useState(null);

  const [defaultDZ, setDefaultDZ] = useState(null);

   //style

   const headerStyle = {
    fontFamily: "L1",
    fontSize: "1.2em",
    color: pallette[0],
    background: pallette[4],
    borderRadius: "1em",
    padding: "0",
    textAlign: "center",
   };

   const headerButtonInputStyle = {
    background: pallette[4],
    width: "100px",
    border: ".1em solid",
    borderColor: pallette[0],
    borderRadius: "1.5vw",
    padding: "0",
    margin: "0",
    marginLeft: "1em",
    fontFamily: "L1",
    fontSize: ".9em",
    color: pallette[0],
   };

   const headerButtonStyle = {
    background: pallette[2],
    width: "200px",
    border: "none",
    borderRadius: "1.5vw",
    padding: "0",
    margin: "0",
    fontFamily: "L1",
    fontSize: "1.2em",
    color: pallette[4],
   };

   const headerButton1Style = {
    background: pallette[0],
    width: "200px",
    border: "none",
    borderRadius: "1.5vw",
    padding: "0",
    margin: "0",
    fontFamily: "L1",
    fontSize: "1.2em",
    color: pallette[4],
   };


   const listStyle = {
   fontFamily: "L1",
   fontSize: "1em",
   paddingLeft: ".5em",
   color: pallette[3]
   }

   const formStyle= {
   display: "block",
   padding: "none"
   }

   const rowStyle = {
    display: "flex", 
    flexFlow: "column",
    justifyContent: "space-around", 
    margin: "1vh", padding: "1em", 
    background: pallette[3], 
    borderRadius: '1em',
   };

   const inputSection = {
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-evenly",
    padding: "1em",
    width: "70%",
   };

   const textBox = {
      backgroundColor: pallette[2],
      minWidth: "65%",
      height: "2.3em",
      border: ".1em solid",
      borderColor: pallette[0],
      fontFamily: "L1",
      color: pallette[4]
   }

   const textSection = {
      width: "100%",
      textAlign: "center",
   }

   const title = {      
      fontSize:"min(7vw, 250px)",
      fontFamily: "L1",
      color: pallette[0],
      margin: "auto",
      textAlign: "center",
   }

   const subLTitle = {      
      fontSize:"min(2.5vw, 89.3px)",
      fontFamily: "L1",
      color: pallette[0],
      margin: "auto",
      textAlign: "center",
   }

   const subTitle = {      
      fontSize:"max(3vw, 30px)",
      width: "80%",
      fontFamily: "L1",
      color: pallette[0],
      background: pallette[4],
      margin: "auto",
      textAlign: "center",
      borderRadius: "1.5em",
      border: "none",
   }

  const favoriteButtonNull = {
    height: "fit-content",
    background: pallette[2],
    border: "none",
    padding: ".5em",
    paddingTop: ".5em",
    paddingBottom: ".3em",
    borderRadius: "3em",
    marginRight: "1em",
  }

  const listDiv = {
    display: "flex", 
    alignItems: "center", 
    justifyContent: "space-between", 
    width: "60%", 
    borderRadius: "1em", 
    background: pallette[0], 
    padding: "0", 
    margin: "1em"
  }


   //api

   const storeRig = async () => {
    try {
      const response = await fetch(`${svr}/storerigs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: data.user.ID, name: addJumpRig }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing rig', err);}
  };

  const storePlane = async () => {
    try {
      const response = await fetch(`${svr}/storeplanes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: data.user.ID, name: addJumpAircraft }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing plane', err);}
  }

  const storeDZ = async () => {
    try {
      const response = await fetch(`${svr}/storedz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: data.user.ID, name: addJumpDZ }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing DZ', err);}
  };

  const giveBasket = async () => {
      console.log('giving basket to user id: ', data.user.ID)
    try {
      const response = await fetch(`${svr}/givebasket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: data.user.ID }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
        console.log(returnedDATA.message);
        data.skip();
      } else {
         console.log(returnedDATA.message)
         data.skip();
      }
    } catch (err) {console.error('client failed to send basket', err);}
  };

  const getDefaults = async () => {
    try {
      const response = await fetch(`${svr}/getdefaults`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: props.user.ID}),
      });
      const returnedData = await response.json();
      const data = returnedData.results[0]
      if(response.ok){
        setDefualtRig(data.rig);
        setDefaultAircraft(data.aircraft);
        setDefaultDZ(data.dz);
      } else{
        console.error('no defaults retrieved', response);
      }
    } catch (err) {
      console.error('client failed getting defaults', err);
    }
  }; 

  const storeDefaultRig = async (eqpm) => {
    try {
      const response = await fetch(`${svr}/storedefaultrig`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: data.user.ID, rig: eqpm }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
        getDefaults();
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing Defualt', err);}
  };

  const storeDefaultDZ = async (dz) => {
    try {
      const response = await fetch(`${svr}/storedefaultdz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: data.user.ID, dz: dz }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
        getDefaults();
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing Default', err);}
  };

  const storeDefaultAircraft = async (aircraft) => {
    try {
      const response = await fetch(`${svr}/storedefaultaircraft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: data.user.ID, aircraft: aircraft }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
        getDefaults();
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing Default', err);}
  };


  //rendered lists

  const planeList = planes.map((plane, index) => 
    <div key={index} style={listDiv}>
    <p style={listStyle}>{plane}</p>
    {plane !== 'No saved planes yet' && plane !== defaultAircraft ? <button type="button" style={favoriteButtonNull} onClick={() => handleSetFavoriteAircraft(plane)}><img style={{ width: '1.5em', margin: "0", border: "none"}} src="/favorite-off-svgrepo-com.svg" /></button> : plane !== 'No saved planes yet' && favoriteIcon}
  </div>
  );

  const rigList = rigs.map((rig, index) => 
    <div key={index} style={listDiv}>
      <p style={listStyle}>{rig}</p>
      {rig !== 'No saved rigs yet' && rig !== defaultRig ? <button type="button" style={favoriteButtonNull} onClick={() => handleSetFavoriteRig(rig)}><img style={{ width: '1.5em', margin: "0", border: "none"}} src="/favorite-off-svgrepo-com.svg" /></button> : rig !== 'No saved rigs yet' && favoriteIcon}
    </div>
  );

  const DZList = DZs.map((DZ, index) => 
    <div key={index} style={listDiv}>
      <p style={listStyle}>{DZ}</p>
      {DZ !== 'No saved dropzones yet' && DZ !== defaultDZ ? <button type='button' style={favoriteButtonNull} onClick={() => handleSetFavoriteDZ(DZ)}><img style={{ width: '1.5em', margin: "0", border: "none"}} src="/favorite-off-svgrepo-com.svg" /></button> : DZ !== 'No saved dropzones yet' && favoriteIcon}
    </div>
  );



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

  function handleDzForm() {
    setEqpmPage(true);
    setAircraftPage(true);
    setDzPage(!dzPage);
  }

  function handleAddJumpDZChange (e) {
    setAddJumpDZ(e.target.value);
  }

  function handleAddJumpAircraftChange (e) {
    setAddJumpAircraft(e.target.value);
  }

  function handleAddJumpRigChange (e) {
    setAddJumpRig(e.target.value);
  }

  async function handleDZInput(e) {
    e.preventDefault();
    for (let d of DZs){
      if (addJumpDZ === d) return alert('Dropzone already exists')
    }
    if (addJumpDZ.trim() !== ""){
      await storeDZ(addJumpDZ);
      setDZs([...DZs, addJumpDZ]);
      setAddJumpDZ("");
    }
  }

  async function handleAircraftInput(e) {
    e.preventDefault();
    for (let a of planes){
      if (addJumpAircraft === a) return alert('Aircraft already exists')
    }
    if (addJumpAircraft.trim() !== ""){
      await storePlane(addJumpAircraft);
      setPlanes([...planes, addJumpAircraft]);
      setAddJumpAircraft("");
    }
  }

  async function handleRigInput(e) {
    e.preventDefault()
    for (let r of rigs) {
      if (addJumpRig === r) return alert('rig already exists')
    }
    if (addJumpRig.trim() !== ""){
      await storeRig(addJumpRig);
      setRigs([...rigs, addJumpRig]);
      setAddJumpRig("");
    }
  }

  function handleSetFavoriteRig (chute) {

    console.log('chute=', chute)
    if (chute === defaultRig) return
    storeDefaultRig(chute)

  }

  function handleSetFavoriteDZ (dz) {

    console.log('dz=', dz)
    if (dz === defaultDZ) return
    storeDefaultDZ(dz)

  }

  function handleSetFavoriteAircraft (ac) {

    console.log('ac=', ac);
    if (ac === defaultAircraft) return;
    storeDefaultAircraft(ac);

  }

  //useEffect

  useEffect(() => {
    setRigs(props.rigs.map(rig => rig.name));  
    setDZs(props.dzs.map(dz => dz.name));  
    setPlanes(props.planes.map(plane => plane.name));  
    setDefaultAircraft(props.defaults.plane);
    setDefualtRig(props.defaults.rig);
    setDefaultDZ(props.defaults.dz);
  },[]);




   return(
      <div>


         <div style={rowStyle}>
            <div style={textSection}>

              <p style={title}>Welcome {data.user.name}!</p>
              <p style={subLTitle}>add your defualts then start adding your logs</p>

            </div>

            <div style={inputSection}>

               <button style={eqpmPage ? headerButtonStyle : headerButton1Style} onClick={handleEquipmentForm}>Equipment</button>
               <form style ={eqpmPage ? {display: "none"} : {formStyle}}>
                  <p style={headerStyle}>
                    Add Your Rigs 
                  </p>
                     
                     <div>
                        <input 
                           type="text" 
                           style={textBox}
                           placeholder="new rig"
                           value={addJumpRig}
                           onChange={handleAddJumpRigChange}
                        />
                        <button style={headerButtonInputStyle} onClick={handleRigInput}>Add Rig</button>
                     </div>
                     {rigList}
               </form>
            </div>

            <div style={inputSection}>
               <button onClick={handleAircraftForm}style={aircraftPage ? headerButtonStyle : headerButton1Style}>Aircraft</button>
               <form style={!aircraftPage ? formStyle : {display: "none"}}>

                  <p style={headerStyle}>
                    Add Your Aircraft 
                  </p>

                  

                  <div>
                    <input 
                      type="text" 
                      style={textBox}
                      placeholder="New Aircraft" 
                      value={addJumpAircraft}
                      onChange={handleAddJumpAircraftChange}
                    /> 
                    <button style={headerButtonInputStyle} onClick={handleAircraftInput}>Add Aircraft</button>
                  </div>

                  {planeList}

               </form>
            </div>

            <div style={inputSection}>
               <button onClick={handleDzForm}style={dzPage ? headerButtonStyle : headerButton1Style}>Drop-Zone</button>
              <form style={!dzPage ? formStyle : {display: "none"}}>
                <p style={headerStyle}>Add Drop-Zones</p>
                
                <input 
                  style={textBox}
                  id="newDZ"
                  type="text" 
                  placeholder="new DZ"
                  value={addJumpDZ}
                  onChange={handleAddJumpDZChange}
                />
              <button style={headerButtonInputStyle} onClick={handleDZInput}>add DZ</button>
              {DZList}
            </form>
            </div>
            <div style={textSection}><button style={subTitle} onClick={giveBasket}>Start Adding Logs</button></div>

         </div>



      </div>
   )
}

export default WelcomeForm