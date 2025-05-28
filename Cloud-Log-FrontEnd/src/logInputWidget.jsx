import {useState, useEffect, useContext} from 'react';
import './style/logInputWidget.css'


function LogInputWidget() {

  //state hooks vv

//list states
  const [planes, setPlanes] = useState(['cessna182', 
    'Cessna 206', 
    'cessna 208 "caravan"',
    'DHC-6 "Twin Otter"',
    'SC-7 "Skyvan"',
  ])

  const [rigs, setRigs] = useState(['v350, strom170', 'v350, strom190']);

  const [DZs, setDZs] = useState(['CPI', 'The Ranch'])


//default states
  const [defaultRig, setDefaultRig] = useState(null);

//add States
  const [addJumpDZ, setAddJumpDZ] = useState(null);
  const [addJumpAircraft, setAddJumpAircraft] = useState(null);
  const [addJumpRig, setAddJumpRig] = useState(null);


//dropdown states
  const [eqpmPage, setEqpmPage] = useState(true);


//newjump variables
  const [newJumpNum, setNewJumpNum] = useState(null);

  const [newJumpDate, setNewJumpDate] = useState(null);

  const [newJumpDZ, setNewJumpDZ] = useState(null);

  const [newJumpAircraft, setNewJumpAircraft] = useState(null);

  const [newJumpRig, setNewJumpRig] = useState(null);

  const [newJumpAlt, setNewJumpAlt] = useState(null);

  const [newJumpDur, setNewJumpDur] = useState(null);

  //state hooks ^^
  
  //functional elements vv
//page elements
  function handleEquipmentForm() {
    setEqpmPage(!eqpmPage)
  }
//string elements
  function handleJumpNumChange (e) {
    setNewJumpNum(e.target.value);
  }

  function handleJumpDateChange (e) {
    setNewJumpDate(e.target.value);
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

  function handleAddJumpAltChange (e) {
    setNewJumpAlt(e.target.value);
  }

  function handleAddJumpDurChange (e) {
    setNewJumpDur(e.target.value);
  }
//buttons
  function handleDZInput (e) {
    e.preventDefault()
    if (addJumpDZ.trim() !== ""){
      const previousDZs = [...DZs];
      console.log('previous DZs - '[previousDZs])
      setDZs([...previousDZs, addJumpDZ]);
      setAddJumpDZ("")
    }



  }

  function handleAircraftInput (e) {
    e.preventDefault()
    if (addJumpAircraft.trim() !== ""){
      const previousAircraft = [...planes];
      console.log('previous planes - '[previousAircraft])
      setPlanes([...previousAircraft, addJumpAircraft]);
      setAddJumpAircraft("")
    }

  }

  function handleRigInput (e) {
    e.preventDefault()
    if (addJumpRig.trim() !== ""){
      const previousRigs = [...rigs];
      console.log('previous rigs - '[previousRigs])
      setRigs([...previousRigs, addJumpRig]);
      setAddJumpRig("")
    }

  }
//radio buttons
  function handleJumpDZChange(e) {
    console.log("Clicked DZ value:", e.target.value);
    setNewJumpDZ(e.target.value);
  }

  function handleJumpAircraftChange(e) {
    console.log("Clicked Aircraft value:", e.target.value);
    setNewJumpAircraft(e.target.value);
  }  

  function handleJumpRigChange(e) {
    console.log("Clicked Rig value:", e.target.value);
    setNewJumpRig(e.target.value);
  }

  //functional elements ^^

  //rendered lists vv

  const planeList = planes.map((plane, index) => 
    <div key={index}>
    <input
      type="radio"
      id={`plane-${index}`}
      name="plane"
      value={plane}
      checked={newJumpAircraft === plane}
      onChange={handleJumpAircraftChange}
      style={{marginTop: "1.5vh"}}
    />
    <label htmlFor={`plane-${index}`}>{plane}</label>
  </div>
  );

  const rigList = rigs.map((rig, index) => 
    <div key={index}>
      <input
        type="radio"
        id={`rig-${index}`}
        name="rig"
        value={rig}
        checked={newJumpRig === rig}
        onChange={handleJumpRigChange}
        style={{marginTop: "1.5vh"}}
      />
      <label htmlFor={`rig-${index}`}>{rig}</label>
    </div>
  );

  const DZList = DZs.map((DZ, index) => 
    <div key={index}>
      <input
        type="radio"
        id={`DZ-${index}`}
        name="DZ"
        value={DZ}
        checked={newJumpDZ === DZ}
        onChange={handleJumpDZChange}
        style={{marginTop: "1.5vh"}}
      />
      <label htmlFor={`DZ-${index}`}>{DZ}</label>
    </div>
  )

  //rendered lists ^^



  //Color Pallette vv

  const pallette  = [
  '#f3e8ee',
  '#bacdb0',
  '#729b79',
  '#475b63',
  '#2e2c2f'
];  
  console.log(
    pallette
  )

  //color Pallette ^^



  //inline styles vv
    
  const widgetStyle = {
    background: pallette[2],
    borderColor: pallette[1],
    border: "solid",
    padding: "2em",
    borderRadius: ".75em"
  }

  const alignTop = {
   border: "0",
   marginTop: "25px",
   display: "flex",
   flexFlow: "column",
   alignItems: "left",
   verticalAlign: "top",
   maxWidth: "17vw",
   textAlignLast: "center",
  }

  const headerStyle = {
    fontFamily: "L1",
  }

  const headerButtonStyle = {
    background: pallette[0],
    border: "solid",
    borderColor: pallette[4],
    borderRadius: "1.5vw",
    padding: ".5vw",
    fontFamily: "L1",
  }

  const inputButtonStyle = {
      color: pallette[0],
      border: "0",
      borderColor: pallette[4],
      borderRadius: "1.5vw",
      padding: "0",
      margin: "0",
     fontFamily: "L1",
  }

  const formStyle = {
    display: "block", 
    textAlignLast: "left", 
    fontFamily: "L1", 
    fontSize: "1.4vw"
  };

  const previewStyle ={
    marginTop: "2vh",
    padding: "2vw",
    background: pallette[3],
    display: "flex",
    justifyContent: "space-evenly"
  }
  
  //inline styles ^^

  return(
    <>
    <div id="inputDashboard" style={widgetStyle}>

      <div className="inputContainer">
        <div>
          <h3 style={headerStyle}>Jump Number</h3>
          <input 
            type="number" 
            placeholder="Jump #"
            value={newJumpNum}
            onChange={handleJumpNumChange}
          />
        </div>
        
        <div>
          <h3 style={headerStyle}>Jump Date</h3>
          <input 
            type="date" 
            value={newJumpDate}
            onChange={handleJumpDateChange}
          />
        </div>
        
        <div>
          <h3 style={headerStyle}>Drop-Zone</h3>
          <form style={formStyle}>
            {DZList}
            <p style={headerStyle}>Add Drop-Zone</p>
            <input 
              id="newDZ"
              type="text" 
              placeholder="new DZ"
              value={addJumpDZ}
              onChange={handleAddJumpDZChange}
            />
            <button style={headerButtonStyle} onClick={handleDZInput}>add DZ</button>
          </form>
          
          
        </div>
        
      </div>

      <div style={alignTop}>

        <h3 style={headerStyle}>Aircraft<p style={{display: "inline-block", margin: "0", marginLeft: "1vw"}}></p></h3>

        <form style={formStyle}>

          <p style={headerStyle}>
            select your aircraft 
          </p>

          {planeList}

          <div>
            <p style={headerStyle}>
              add aircraft
            </p>
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

      <div className="inputContainer">
        <div>
          <button style={headerButtonStyle} onClick={handleEquipmentForm}>Equipment</button>
          <form style ={eqpmPage ? {display: "none"} : {display: "block", border: "solid", borderRadius: "1.5vw"}}>
            {rigList}
            <div>
              <h3 style={headerStyle}>add rig</h3>
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

        <div>
          <h3 style={headerStyle}>
            Exit Altitude
            <sub>(ft)</sub>
          </h3>
          <input 
            type="number" 
            placeholder="altitutde"
            value={newJumpAlt}
            onChange={handleAddJumpAltChange}
          />
        </div>

        <div>
          <h3 style={headerStyle}>
            Freefall Time 
            <sub>(s)</sub>
          </h3>
          <input 
            type="number" 
            placeholder="time"
            value={newJumpDur} 
            onChange={handleAddJumpDurChange}
          />

        </div>
      </div>

      <div className="inputContainer">
        <div>
          <h3 style={headerStyle}>
            Log-book Signature Upload
            <sub style={{display: "block", fontSize: ".5em"}}>(upload entire logbook entery for this jump)</sub>
          </h3>
          <input type="file" style={inputButtonStyle}/>
        </div>


        <button style={headerButtonStyle}>Upload Skydive</button>

      </div>
      
    </div>


    <div className="outputPreview" style={previewStyle}>
      <div className="inputContainer">
        <p>Jump # {newJumpNum}</p>
        <p>Jump Date: {newJumpDate}</p>
        <p>DZ: {newJumpDZ}</p>
      </div>

      <div className="inputContainer">
        <p>Aircraft: {newJumpAircraft}</p>
        <p>Rig: {newJumpRig}</p>
      </div>

      <div className="inputContainer">
        <p>Exit Alt: {newJumpAlt}</p>
        <p>Freefall Time: {newJumpDur}</p>
        <p>Signature Upload: {}</p>
      </div>

    </div>
    </>
  )

}

export default LogInputWidget;

export function getPallette(){

    const pallette  = [
      '#f3e8ee',
      '#bacdb0',
      '#729b79',
      '#475b63',
      '#2e2c2f'
    ];  
  return(pallette)
}

