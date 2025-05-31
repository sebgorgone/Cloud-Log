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

  const [aircraftPage, setAircraftPage] = useState(true);

  const [tagsPage, setTagsPage] = useState(true);


              //tags dropdown
  const [jumpTypeTagsPage, setJumpTypeTagsPage] = useState(false);

  const [openCharTagsPage, setOpenCharTagsPage] = useState(false);

  const [liscTagsPage, setLiscTagsPage] = useState(false);

  const [altTagsPage, setAltTagsPage] = useState(false);

  const [evnTagsPage, setEvnTagsPage] = useState(false);

  const [groupTagsPage, setGroupTagsPage] = useState(false);



//newjump variables
  const [newJumpNum, setNewJumpNum] = useState(null);

  const [newJumpDate, setNewJumpDate] = useState(null);

  const [newJumpDZ, setNewJumpDZ] = useState(null);

  const [newJumpAircraft, setNewJumpAircraft] = useState(null);

  const [newJumpRig, setNewJumpRig] = useState(null);

  const [newJumpAlt, setNewJumpAlt] = useState(null);

  const [newJumpDur, setNewJumpDur] = useState(null);

  const [newJumpTagList, setNewJumpTagList] = useState([]);

  //state hooks ^^
  
  //functional elements vv
//page elements
  function handleEquipmentForm() {
    setEqpmPage(!eqpmPage);
  }

  function handleAircraftForm() {
    setAircraftPage(!aircraftPage);
  }

  function handleTagsForm(e) {
      e.preventDefault();
    setTagsPage(!tagsPage);
  }


        //tags pages
  function handleJumpTypeTagsForm(e) {
      e.preventDefault();
    setJumpTypeTagsPage(!jumpTypeTagsPage);
  }

  function handleOpenCharTagsForm(e) {
    e.preventDefault();
    setOpenCharTagsPage(!openCharTagsPage);
  }

  function handleLiscTagsForm(e) {
    e.preventDefault();
    setLiscTagsPage(!liscTagsPage);
  }

  function handleAltTagsForm(e) {
    e.preventDefault();
    setAltTagsPage(!altTagsPage);
  }

  function handleEvnTagsForm(e) {
    e.preventDefault();
    setEvnTagsPage(!evnTagsPage);
  }

    function handleGroupTagsForm(e) {
    e.preventDefault();
    setGroupTagsPage(!evnTagsPage);
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

  //tags state and logic VV

  //states


                      //JUMPTYPES
  const [tagBellyJTT, setTagBellyJTT] = useState(true);
  const [tagFreeFlyJTT, setTagFreeflyJTT] = useState(true);
  const [tagWingsuitJTT, setTagWingsuitJTT] = useState(true);
  const [tagBaseJTT, setTagBaseJTT] = useState(true);
  const [tagHnPJTT, setTagHnPJTT] = useState(true);
  const [tagSwoopJTT, setTagSwoopJTT] = useState(true);
  const [tagCrwJTT, setTagCrwJTT] = useState(true);
  const [tagVfsJTT, setTagVfsJTT] = useState(true);
  const [tagMfsJTT, setTagMfsJTT] = useState(true);
  const [tagFsJTT, setTagFsJTT] = useState(true);
  const [tagAngleJTT, setTagAngleJTT] = useState(true);
  const [tagTrackingJTT, setTagTrackingJTT] = useState(true);
  const [tagSoloJTT, setTagSoloJTT] = useState(true);
  const [tagTandemJTT, setTagTandemJTT] = useState(true);
  const [tagAltJTT, setTagAltJTT] = useState(true);
  const [tagBigwayJTT, setTagBigwayJTT] = useState(true);
  const [tagZooJTT, setTagZooJTT] = useState(true);


                    //OPENINGS
  


   //handlers

  const tagHandler = { 
    JTbelly: (e) => {
      e.preventDefault();
      setTagBellyJTT(!tagBellyJTT);
      console.log('belly tag is ', tagBellyJTT);
    },
    JTFreeFly: (e) => {
      e.preventDefault();
      setTagFreeflyJTT(!tagFreeFlyJTT);
    },
    JTWingsuit: (e) => {
      e.preventDefault();
      setTagWingsuitJTT(!tagWingsuitJTT);
    },
    JTBase: (e) => {
      e.preventDefault();
      setTagBaseJTT(!tagBaseJTT);
    },
    JTHnP: (e) => {
      e.preventDefault();
      setTagHnPJTT(!tagHnPJTT);
    },
    JTSwoop: (e) => {
      e.preventDefault();
      setTagSwoopJTT(!tagSwoopJTT);
    },
    JTCrw: (e) => {
      e.preventDefault();
      setTagCrwJTT(!tagCrwJTT);
    },
    JTVfs: (e) => {
      e.preventDefault();
      setTagVfsJTT(!tagVfsJTT);
    },
    JTMfs: (e) => {
      e.preventDefault();
      setTagMfsJTT(!tagMfsJTT);
    },
    JTFs: (e) => {
      e.preventDefault();
      setTagFsJTT(!tagFsJTT);
    },
    JTAngle: (e) => {
      e.preventDefault();
      setTagAngleJTT(!tagAngleJTT);
    },
    JTTracking: (e) => {
      e.preventDefault();
      setTagTrackingJTT(!tagTrackingJTT);
    },
    JTSolo: (e) => {
      e.preventDefault();
      setTagSoloJTT(!tagSoloJTT);
    },
    JTTandem: (e) => {
      e.preventDefault();
      setTagTandemJTT(!tagTandemJTT);
    },
    JTAlt: (e) => {
      e.preventDefault();
      setTagAltJTT(!tagAltJTT);
    },
    JTBigway: (e) => {
      e.preventDefault();
      setTagBigwayJTT(!tagBigwayJTT);
    },
    JTZoo: (e) => {
      e.preventDefault();
      setTagZooJTT(!tagZooJTT);
    },
  }
  
  //button styles
  const tagButtonOff = {
    fontFamily: "L1",
    paddingLeft: "1.5vw",
    paddingRight: "1.5vw",
    fontSize: "max(1.6vh,1.4vw)",
    marginTop: "1vh",
    display:"block",
    backgroundColor: pallette[4],
    color: pallette[0],
    border: "solid .3vh",
    borderRadius: "1.1vh"
  }

  const tagButtonOn = {
    fontFamily: "L1",
    paddingLeft: "1.5vw",
    paddingRight: "1.5vw",
    fontSize: "1.6vh",
    marginTop: "1vh",
    display:"block",
    backgroundColor: pallette[1],
    color: pallette[4],
    border: "solid .3vh",
    borderColor: pallette[4],
    borderRadius: "1.1vh"
  }
  //tags and state logic ^^



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

    const formHiddenStyle = {
    display: "none", 
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

  const tagsHeaderStyle = {
    fontFamily: "L1",
    postion: "absolute"
  }

  const overlayStyle = {
    position: "fixed",
    zIndex: "2",
    width: "80%",
    height: "50%",
    overflowY: "scroll",
    right: "5%",
    top: "5%",
    color: pallette[4],
    backgroundColor: pallette[1],
    border: "solid .15em",
    borderColor: pallette[4],
    borderRadius: ".25em",

  }

  const xButtonStyle ={
    position: "absolute",
    fontSize: "1.2em",
    fontWieght: "Bold",
    top: "1vw",
    right: "1vw",
    backgroundColor: pallette[0],
    border: "solid .15em",
    borderColor: pallette[4],
    borderRadius: ".25em",
  }

  const tagShellStyle= {
    display: "flex",
    justifyContent: "space-around",
    borderRadius: "3vw",
    margin: "1em",
    background: pallette[2],
  }

  const tagListStyle = {
    justifyContent: "left",
    margin: "1em"

  }
  
  const tagListButtonStyleJT={
    fontFamily: "L1",
    fontSize: "1.7vw",
    background: pallette[1],
    border: "solid .1em",
    borderColor: pallette[4],
    borderRadius: "1.5vw",
    padding: ".5vw",
  }

  const tagListButtonStyleOC={
    fontFamily: "L1",
    fontSize: "1.8vw",
    background: pallette[1],
    border: "solid .1em",
    borderColor: pallette[4],
    borderRadius: "1.5vw",
    padding: ".5vw",
  }

  const tagListButtonStyleLI={
    fontFamily: "L1",
    fontSize: "1.55vw",
    background: pallette[1],
    border: "solid .1em",
    borderColor: pallette[4],
    borderRadius: "1.5vw",
    padding: ".5vw",
  }

  const tagListButtonStyleALT = {
    fontFamily: "L1",
    fontSize: "1.6vw",
    background: pallette[1],
    border: "solid .1em",
    borderColor: pallette[4],
    borderRadius: "1.5vw",
    padding: ".5vw",
  }

  const tagListButtonStyleEVN = {
    fontFamily: "L1",
    fontSize: "1.65vw",
    background: pallette[1],
    border: "solid .1em",
    borderColor: pallette[4],
    borderRadius: "1.5vw",
    padding: ".5vw",
  }
  
  const tagListButtonStyleGRP = {
    fontFamily: "L1",
    fontSize: "1.55vw",
    background: pallette[1],
    border: "solid .1em",
    borderColor: pallette[4],
    borderRadius: "1.5vw",
    padding: ".5vw",
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

      <div className="inputContainer">

        <button onClick={handleAircraftForm}style={headerButtonStyle}>Aircraft{aircraftPage ? ' (show)' : ' (hide)'}</button>

        <form style={!aircraftPage ? formStyle : formHiddenStyle}>

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

        <button style={headerButtonStyle} onClick={handleTagsForm}>Tags{tagsPage ? ' (show)' : ' (hide)'}</button>

        <form style={tagsPage ? overlayStyle : {display: "none"}}>
          <h3 style={tagsHeaderStyle}>Select Tags</h3>
          <button style={xButtonStyle} onClick={handleTagsForm}>X</button>

          <div style={tagShellStyle}>


            <div style={tagListStyle}>

              <button onClick={handleJumpTypeTagsForm} style={tagListButtonStyleJT}>Jump Types{!jumpTypeTagsPage ? ' (show)' : ' (hide)'}</button>

              <div style={jumpTypeTagsPage ? {marginTop: "1.8vh"} : {display: "none"}}>

                <button style={tagBellyJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTbelly}>Belly</button>
                <button style={tagFreeFlyJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTFreeFly}>Freefly</button>
                <button style={tagWingsuitJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTWingsuit}>Wingsuit</button>
                <button style={tagBaseJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTBase}>Base</button>
                <button style={tagHnPJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTHnP}>Hop n Pop</button>
                <button style={tagSwoopJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTSwoop}>Swoop</button>
                <button style={tagCrwJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTCrw}>CRW</button>
                <button style={tagVfsJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTVfs}>VFS</button>
                <button style={tagMfsJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTMfs}>MFS</button>
                <button style={tagFsJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTFs}>FS</button>
                <button style={tagAngleJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTAngle}>Angle</button>
                <button style={tagTrackingJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTTracking}>Tracking</button>
                <button style={tagSoloJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTSolo}>Solo</button>
                <button style={tagTandemJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTTandem}>Tandem</button>
                <button style={tagAltJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTAlt}>Altitude</button>
                <button style={tagBigwayJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTBigway}>Big Way</button>
                <button style={tagZooJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTZoo}>Zoo</button>
                

              </div>            
            </div>

            <div style={tagListStyle}>

              <button onClick={handleOpenCharTagsForm} style={tagListButtonStyleOC}>Openings{!openCharTagsPage ? ' (show)' : ' (hide)'}</button>

              <div style={openCharTagsPage ? {marginTop: "1.8vh"} : {display: "none"}}>
              </div>

            </div>

            <div style={tagListStyle}>

              <button onClick={handleLiscTagsForm} style={tagListButtonStyleLI}>Liscensces <br />and ratings{!liscTagsPage ? ' (show)' : ' (hide)'}</button>

              <div style={liscTagsPage ? {marginTop: "1.8vh"} : {display: "none"}}>
              </div>

            </div>


          </div>

          <div style={tagShellStyle}>

            <div style={tagListStyle}>

              <button onClick={handleAltTagsForm} style={tagListButtonStyleALT}>Altituted{!altTagsPage ? ' (show)' : ' (hide)'}</button>

              <div style={altTagsPage ? {marginTop: "1.8vh"} : {display: "none"}}>

            </div>


            </div>

            <div style={tagListStyle}>

              <button onClick={handleEvnTagsForm} style={tagListButtonStyleEVN}>Events{!evnTagsPage ? ' (show)' : ' (hide)'}</button>

              <div style={evnTagsPage ? {marginTop: "1.8vh"} : {display: "none"}}>

            </div> 


            </div>

            <div style={tagListStyle}>

              <button onClick={handleGroupTagsForm} style={tagListButtonStyleGRP}>group Size{!groupTagsPage ? ' (show)' : ' (hide)'}</button>

              <div style={groupTagsPage ? {marginTop: "1.8vh"} : {display: "none"}}>

            </div> 


            </div>


          </div>
          
        </form>
 
      </div>

      <div className="inputContainer">
        <div>
          <button style={headerButtonStyle} onClick={handleEquipmentForm}>Equipment{eqpmPage ? ' (show)' : ' (hide)'}</button>
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

