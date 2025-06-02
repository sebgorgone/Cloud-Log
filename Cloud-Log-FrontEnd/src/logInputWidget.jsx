import {useState, useEffect, } from 'react';
import './style/logInputWidget.css'
import { useAuth } from './contexts/authContext';


function LogInputWidget() {

  //get user data
  const userData = useAuth();
  console.log('Fetched User Data: ',userData.user.id)


  //state hooks vv

//list states
  const [planes, setPlanes] = useState([])

  const [rigs, setRigs] = useState([]);

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

  const [groupTagsPage, setGroupTagsPage] = useState(false);

  const [cnpyTagsPage, setCnpyTagsPage] = useState(false);

  const [exitTagsPage, setExitTagsPage] = useState(false);

  const [emergencyTagsPage, setEmergencyTagsPage] = useState(false);

  const [malfunctionTagsPage, setMalfunctionTagsPage] = useState(false);


//newjump variables
  const [newJumpNum, setNewJumpNum] = useState(null);

  const [newJumpDate, setNewJumpDate] = useState(null);

  const [newJumpDZ, setNewJumpDZ] = useState(null);

  const [newJumpAircraft, setNewJumpAircraft] = useState(null);

  const [newJumpRig, setNewJumpRig] = useState(null);

  const [newJumpAlt, setNewJumpAlt] = useState(null);

  const [newJumpDur, setNewJumpDur] = useState(null);

  const [newJumpSigUpload, setNewJumpSigUpload] = useState(null);

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

  function handleGroupTagsForm(e) {
    e.preventDefault();
    setGroupTagsPage(!groupTagsPage);
  }

  function handleCnpyTagsForm(e) {
    e.preventDefault();
    setCnpyTagsPage(!cnpyTagsPage);
  }

  function handleEmergencyTagsForm(e) {
    e.preventDefault();
    setEmergencyTagsPage(!emergencyTagsPage);
  }

  function handleMalfunctionTagsForm(e) {
    e.preventDefault();
    setMalfunctionTagsPage(!malfunctionTagsPage);
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

  function handleGroupSizeChange (e) {
    setTagGroupSize(e.target.value);
  }
//buttons
  function handleDZInput (e) {
    e.preventDefault()
    if (addJumpDZ.trim() !== ""){
      storeDZ(addJumpDZ)
      getDZs();
      setAddJumpDZ("")
    }



  }

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
      storeRig(addJumpRig);
      getRigs();
      setAddJumpRig("");
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

//file upload

  const handleSigFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setPdfFile(null);
      console.log('file uploaded was not a PDF------')
      return;
    }

    setNewJumpSigUpload(file)

    console.log('uploaded PDF-', file)
    
    
  };

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

  const pallette  = ["#22223b", "#4a4e69", "#9a8c98", "#c9ada7", "#f2e9e4"].reverse();  

//

  //color Pallette ^^

  //tags state and logic VV   (info: info bundled b tagBulder() - state variables for selector buttons and output check hbt f3ß2)

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
  const [tagNightJTT, setTagNightJTT] = useState(true);
  const [tagHighPullJTT, setTagHighPullJTT] = useState(true);
  const [tagFullJTT, setTagFullJTT] = useState(true);
  const [tagHighJTT, setTagHighJTT] = useState(true);


                    //OPENINGS
  const [tagGoodOC, setTagGoodOC] = useState(true);
  const [tagHardOC, setTagHardOC] = useState(true);
  const [tagOffHeadingOC, setTagOffHeadingOC] = useState(true);
  const [tagOnHeadingOC, setTagOnHeadingOC] = useState(true);
  const [tagPCDelayOC, setTagPCDelayOC] = useState(true);
  const [tagLineBreakOC, setTagLineBreakOC] = useState(true);
  const [tagStableOC, setTagStableOC] = useState(true);
  const [tagUnstableOC, setTagUnstableOC] = useState(true);

                    //Liscensing and work 
  const [tagTILSC, setTagTILSC] = useState(true);
  const [tagVideoLSC, setTagVideoLSC] = useState(true);
  const [tagAffiLSC, setTagAffiLSC] = useState(true);
  const [tagCoachLSC, setTagCoachLSC] = useState(true);
  const [tagOrganizerLSC, setTagOrganizerLSC] = useState(true);
  const [tagJumpMasterLSC, setTagJumpMasterLSC] = useState(true);
  const [tagCheckLSC, setTagCheckLSC] = useState(true);
  const [tagRecurrencyLSC, setTagRecurrencyLSC] = useState(true);
  const [tagStudentLSC, setTagStudentLSC] = useState(true);

                      //groupsize
  const [tagGroupSize, setTagGroupSize] = useState(null);

                    //Canopy and weather
  const [tagHighWindWTHR, setTagHighWindWTHR] = useState(true);
  const [tagLowWindWTHR, setTagLowWindWTHR] = useState(true);
  const [tagUpWindWTHR, setTagUpWindWTHR] = useState(true);
  const [tagDownWindWTHR, setTagDownWindWTHR] = useState(true);
  const [tagCrossWindWTHR, setTagCrossWindWTHR] = useState(true);
  const [tagLongSpotWTHR, setTagLongSpotWTHR] = useState(true);
  const [tagRainWTHR, setTagRainWTHR] = useState(true);
  const [tagSnowWTHR, setTagSnowWTHR] = useState(true);


                    //Emergencies
  const [tagCutAwayEMR, setTagCutAwayEMR] = useState(true);
  const [tagOffLandingEMR, setTagOffLandingEMR] = useState(true);
  const [tagAircraftEMR, setTagAircraftEMR] = useState(true);
  const [tagInjuryEMR, setTagInjuryEMR] = useState(true);


                    //MAL
  const [tagEvaMAL, setTagEvaMAL] = useState(true);
  const [tagBiPlaneMAL, setTagBiPlaneMAL] = useState(true);
  const [tagDownPlaneMAL, setTagDownPlaneMAL] = useState(true);
  const [tagLineOverMAL, setTagLineOverMAL] = useState(true);
  const [tagSideBySideMAL, setTagSideBySideMAL] = useState(true);
  const [tagStuckSliderMAL, setTagStuckSliderMAL] = useState(true);
  const [tagPCInTowMAL, setTagPCInTowMAL] = useState(true);
  const [tagStreamerMAL, setTagStreamerMAL] = useState(true);
  const [tagHorshoeMAL, setTagHorshoeMAL] = useState(true);
  const [tagPrematureMAL, setTagPrematureMAL] = useState(true);
  const [tagHardPullMAL, setTagHardPullMAL] = useState(true);
  const [tagToggleLockMAL, setTagToggleLockMAL] = useState(true);
  const [tagToggleFireMAL, setTagToggleFireMAL] = useState(true);
  const [tagDivingLineTwistMAL, setTagDivingLineTwistMAL] = useState(true);
  const [tagTensionKnotMAL, setTagTensionKnotMAL] = useState(true);

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
    JTNight: (e) => {
      e.preventDefault();
      setTagNightJTT(!tagNightJTT);
    },
    JTHighPull: (e) => {
      e.preventDefault();
      setTagHighPullJTT(!tagHighPullJTT);
    },
    JTFull: (e) => {
      e.preventDefault();
      setTagFullJTT(!tagFullJTT);
    },
    JTHigh: (e) => {
      e.preventDefault();
      setTagHighJTT(!tagHighJTT);
    },
    OCGood: (e) => {
      e.preventDefault();
      setTagGoodOC(!tagGoodOC);
    },
    OCHard: (e) => {
      e.preventDefault();
      setTagHardOC(!tagHardOC);
    },
    OCOffHeading: (e) => {
      e.preventDefault();
      setTagOffHeadingOC(!tagOffHeadingOC);
    },
    OCOnHeading: (e) => {
      e.preventDefault();
      setTagOnHeadingOC(!tagOnHeadingOC);
    },
    OCPCDelay: (e) => {
      e.preventDefault();
      setTagPCDelayOC(!tagPCDelayOC);
    },
    OCLineBreak: (e) => {
      e.preventDefault();
      setTagLineBreakOC(!tagLineBreakOC);
    },
    OCStable: (e) => {
      e.preventDefault();
      setTagStableOC(!tagStableOC);
    },
    OCUnstable: (e) => {
      e.preventDefault();
      setTagUnstableOC(!tagUnstableOC);
    },
    LSCTI: (e) => {
      e.preventDefault();
      setTagTILSC(!tagTILSC);
    },
    LSCVideographer: (e) => {
      e.preventDefault();
      setTagVideoLSC(!tagVideoLSC);
    },
    LSCAffi: (e) => {
      e.preventDefault();
      setTagAffiLSC(!tagAffiLSC);
    },
    LSCCoach: (e) => {
      e.preventDefault();
      setTagCoachLSC(!tagCoachLSC);
    },
    LSCOrganizer: (e) => {
      e.preventDefault();
      setTagOrganizerLSC(!tagOrganizerLSC);
    },
    LSCJumpMaster: (e) => {
      e.preventDefault();
      setTagJumpMasterLSC(!tagJumpMasterLSC);
    },
    LSCCheck: (e) => {
      e.preventDefault();
      setTagCheckLSC(!tagCheckLSC);
    },
    LSCRecurrency: (e) => {
      e.preventDefault();
      setTagRecurrencyLSC(!tagRecurrencyLSC);
    },
    LSCStudent: (e) => {
      e.preventDefault();
      setTagStudentLSC(!tagStudentLSC);
    },
    WTHRHighWind: (e) => {
      e.preventDefault();
      setTagHighWindWTHR(!tagHighWindWTHR);
    },
    WTHRLowWind: (e) => {
      e.preventDefault();
      setTagLowWindWTHR(!tagLowWindWTHR);
    },
    WTHRUpWind: (e) => {
      e.preventDefault();
      setTagUpWindWTHR(!tagUpWindWTHR);
    },
    WTHRDownWind: (e) => {
      e.preventDefault();
      setTagDownWindWTHR(!tagDownWindWTHR);
    },
    WTHRCrossWind: (e) => {
      e.preventDefault();
      setTagCrossWindWTHR(!tagCrossWindWTHR);
    },
    WTHRLongSpot: (e) => {
      e.preventDefault();
      setTagLongSpotWTHR(!tagLongSpotWTHR);
    },
    WTHRRain: (e) => {
      e.preventDefault();
      setTagRainWTHR(!tagRainWTHR);
    },
    WTHRSnow: (e) => {
      e.preventDefault();
      setTagSnowWTHR(!tagSnowWTHR);
    },
    EMRCutAway: (e) => {
      e.preventDefault();
      setTagCutAwayEMR(!tagCutAwayEMR);
    },
    EMROffLanding: (e) => {
      e.preventDefault();
      setTagOffLandingEMR(!tagOffLandingEMR);
    },
    EMRAircraft: (e) => {
      e.preventDefault();
      setTagAircraftEMR(!tagAircraftEMR);
    },
    EMRInjury: (e) => {
      e.preventDefault();
      setTagInjuryEMR(!tagInjuryEMR);
    },
    MALEva: (e) => {
      e.preventDefault();
      setTagEvaMAL(!tagEvaMAL);
    },
    MALBiPlane: (e) => {
      e.preventDefault();
      setTagBiPlaneMAL(!tagBiPlaneMAL);
    },
    MALDownPlane: (e) => {
      e.preventDefault();
      setTagDownPlaneMAL(!tagDownPlaneMAL);
    },
    MALLineOver: (e) => {
      e.preventDefault();
      setTagLineOverMAL(!tagLineOverMAL);
    },
    MALPCInTow: (e) => {
      e.preventDefault();
      setTagPCInTowMAL(!tagPCInTowMAL);
    },
    MALSideBySIde: (e) => {
      e.preventDefault();
      setTagSideBySideMAL(!tagSideBySideMAL);
    },
    MALStuckSlider: (e) => {
      e.preventDefault();
      setTagStuckSliderMAL(!tagStuckSliderMAL);
    },
    MALHorshoe: (e) => {
      e.preventDefault();
      setTagHorshoeMAL(!tagHorshoeMAL);
    },
    MALPremature: (e) => {
      e.preventDefault();
      setTagPrematureMAL(!tagPrematureMAL);
    },
    MALHardPull: (e) => {
      e.preventDefault();
      setTagHardPullMAL(!tagHardPullMAL);
    },
    MALStreamer: (e) => {
      e.preventDefault();
      setTagStreamerMAL(!tagStreamerMAL);
    },
    MALToggleLock: (e) => {
      e.preventDefault();
      setTagToggleLockMAL(!tagToggleLockMAL);
    },
    MALDivingLineTwist: (e) => {
      e.preventDefault();
      setTagDivingLineTwistMAL(!tagDivingLineTwistMAL);
    },
    MALTensionKnot: (e) => {
      e.preventDefault();
      setTagTensionKnotMAL(!tagTensionKnotMAL);
    },
    MALToggleFire: (e) => {
      e.preventDefault();
      setTagToggleFireMAL(!tagToggleFireMAL);
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
    fontSize: "max(1.6vh,1.4vw)",
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
    border: "solid",
    padding: "2em",
    borderRadius: ".75em",
    justifyContent: "center"
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
    height: "max(65%, 180px)",
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

  const GsizeInpStye = {
    fontFamily: "L1",
    fontSize: "2vh",
    height: "1.5vh"
  }

  const tagShellStyle= {
    display: "flex",
    justifyContent: "space-evenly",
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
  
  const tagListButtonStyleGRP = {
    fontFamily: "L1",
    fontSize: "1.55vw",
    background: pallette[1],
    border: "solid .1em",
    borderColor: pallette[4],
    borderRadius: "1.5vw",
    padding: ".5vw",
  }

  const tagListButtonStyleCNPY = {
    fontFamily: "L1",
    fontSize: "1.45vw",
    background: pallette[1],
    border: "solid .1em",
    borderColor: pallette[4],
    borderRadius: "1.5vw",
    padding: ".5vw",
  }

  const tagListButtonStyleEMER = {
    fontFamily: "L1",
    fontSize: "1.35vw",
    background: pallette[1],
    border: "solid .1em",
    borderColor: pallette[4],
    borderRadius: "1.5vw",
    padding: ".5vw",
  }

  const tagListButtonStyleMAL = {fontFamily: "L1",
    fontSize: "1.5vw",
    background: pallette[1],
    border: "solid .1em",
    borderColor: pallette[4],
    borderRadius: "1.5vw",
    padding: ".5vw",
  }

  //inline styles ^^

  //function to gather selected tags

function tagBundler() {
  const tagBundleAll = [
    !tagBellyJTT       ? { name: 'Belly',            cat: 'JTT' } : null,
    !tagFreeFlyJTT     ? { name: 'FreeFly',          cat: 'JTT' } : null,
    !tagWingsuitJTT    ? { name: 'Wingsuit',         cat: 'JTT' } : null,
    !tagBaseJTT        ? { name: 'Base',             cat: 'JTT' } : null,
    !tagHnPJTT         ? { name: 'HnP',              cat: 'JTT' } : null,
    !tagSwoopJTT       ? { name: 'Swoop',            cat: 'JTT' } : null,
    !tagCrwJTT         ? { name: 'Crw',              cat: 'JTT' } : null,
    !tagVfsJTT         ? { name: 'Vfs',              cat: 'JTT' } : null,
    !tagMfsJTT         ? { name: 'Mfs',              cat: 'JTT' } : null,
    !tagFsJTT          ? { name: 'Fs',               cat: 'JTT' } : null,
    !tagAngleJTT       ? { name: 'Angle',            cat: 'JTT' } : null,
    !tagTrackingJTT    ? { name: 'Tracking',         cat: 'JTT' } : null,
    !tagSoloJTT        ? { name: 'Solo',             cat: 'JTT' } : null,
    !tagTandemJTT      ? { name: 'Tandem',           cat: 'JTT' } : null,
    !tagAltJTT         ? { name: 'Alt',              cat: 'JTT' } : null,
    !tagBigwayJTT      ? { name: 'Bigway',           cat: 'JTT' } : null,
    !tagZooJTT         ? { name: 'Zoo',              cat: 'JTT' } : null,
    !tagNightJTT       ? { name: 'Night',            cat: 'JTT' } : null,
    !tagHighPullJTT    ? { name: 'HighPull',         cat: 'JTT' } : null,
    !tagFullJTT        ? { name: 'Full',             cat: 'JTT' } : null,
    !tagHighJTT        ? { name: 'High',             cat: 'JTT' } : null,

    !tagGoodOC         ? { name: 'Good',             cat: 'OC'  } : null,
    !tagHardOC         ? { name: 'Hard',             cat: 'OC'  } : null,
    !tagOffHeadingOC   ? { name: 'OffHeading',       cat: 'OC'  } : null,
    !tagOnHeadingOC    ? { name: 'OnHeading',        cat: 'OC'  } : null,
    !tagPCDelayOC      ? { name: 'PCDelay',          cat: 'OC'  } : null,
    !tagLineBreakOC    ? { name: 'LineBreak',        cat: 'OC'  } : null,
    !tagStableOC       ? { name: 'Stable',           cat: 'OC'  } : null,
    !tagUnstableOC     ? { name: 'Unstable',         cat: 'OC'  } : null,

    !tagTILSC          ? { name: 'TI',               cat: 'LSC' } : null,
    !tagVideoLSC       ? { name: 'Video',            cat: 'LSC' } : null,
    !tagAffiLSC        ? { name: 'Affi',             cat: 'LSC' } : null,
    !tagCoachLSC       ? { name: 'Coach',            cat: 'LSC' } : null,
    !tagOrganizerLSC   ? { name: 'Organizer',        cat: 'LSC' } : null,
    !tagJumpMasterLSC  ? { name: 'JumpMaster',       cat: 'LSC' } : null,
    !tagCheckLSC       ? { name: 'Check',            cat: 'LSC' } : null,
    !tagRecurrencyLSC  ? { name: 'Recurrency',       cat: 'LSC' } : null,
    !tagStudentLSC     ? { name: 'Student',          cat: 'LSC' } : null,

    !tagHighWindWTHR   ? { name: 'HighWind',         cat: 'WTHR'} : null,
    !tagLowWindWTHR    ? { name: 'LowWind',          cat: 'WTHR'} : null,
    !tagUpWindWTHR     ? { name: 'UpWind',           cat: 'WTHR'} : null,
    !tagDownWindWTHR   ? { name: 'DownWind',         cat: 'WTHR'} : null,
    !tagCrossWindWTHR  ? { name: 'CrossWind',        cat: 'WTHR'} : null,
    !tagLongSpotWTHR   ? { name: 'LongSpot',         cat: 'WTHR'} : null,
    !tagRainWTHR       ? { name: 'Rain',             cat: 'WTHR'} : null,
    !tagSnowWTHR       ? { name: 'Snow',             cat: 'WTHR'} : null,

    !tagCutAwayEMR     ? { name: 'CutAway',          cat: 'EMR' } : null,
    !tagOffLandingEMR  ? { name: 'OffLanding',       cat: 'EMR' } : null,
    !tagAircraftEMR    ? { name: 'Aircraft',         cat: 'EMR' } : null,
    !tagInjuryEMR      ? { name: 'Injury',           cat: 'EMR' } : null,

    !tagEvaMAL         ? { name: 'Eva',              cat: 'MAL' } : null,
    !tagBiPlaneMAL     ? { name: 'BiPlane',          cat: 'MAL' } : null,
    !tagDownPlaneMAL   ? { name: 'DownPlane',        cat: 'MAL' } : null,
    !tagLineOverMAL    ? { name: 'LineOver',         cat: 'MAL' } : null,
    !tagSideBySideMAL  ? { name: 'SideBySide',       cat: 'MAL' } : null,
    !tagStuckSliderMAL ? { name: 'StuckSlider',      cat: 'MAL' } : null,
    !tagPCInTowMAL     ? { name: 'PCInTow',          cat: 'MAL' } : null,
    !tagStreamerMAL    ? { name: 'Streamer',         cat: 'MAL' } : null,
    !tagHorshoeMAL     ? { name: 'Horshoe',          cat: 'MAL' } : null,
    !tagPrematureMAL   ? { name: 'Premature',        cat: 'MAL' } : null,
    !tagHardPullMAL    ? { name: 'HardPull',         cat: 'MAL' } : null,
    !tagToggleLockMAL  ? { name: 'ToggleLock',       cat: 'MAL' } : null,
    !tagToggleFireMAL  ? { name: 'ToggleFire',       cat: 'MAL' } : null,
    !tagDivingLineTwistMAL ? { name: 'DivingLineTwist',   cat: 'MAL' } : null,
    !tagTensionKnotMAL ? { name: 'TensionKnot',      cat: 'MAL' } : null,

    tagGroupSize > 1   ? { name: `GroupSize${tagGroupSize}`, value: tagGroupSize,        cat: 'GROUP' } : null
  ];
  const filteredNullBundle = tagBundleAll.filter(item => item !== null);
  const filteredBundle = filteredNullBundle.map(item => item.name);
  setNewJumpTagList([...tagBundleAll.filter(item => item !== null)]);
  setTagsPreview(tagBundleAll.filter(item => item !== null).map((tag, idx) => {
    return(
      <div key={idx}>
        <p>{tag.name === 'GroupSize' && tagGroupSize > 1 && tagGroupSize + ' Way Group'}</p>
        <p>{tag.name !== 'GroupSize' && tag.name}</p>

      </div>
    )
  }))
  // console.log('tags html output: ', tagsPreview);
  return tagBundleAll.filter(item => item !== null);
}

const [tagsPreview, setTagsPreview] = useState(null);

      //useEffects
  useEffect(() => {
    tagBundler();
    setNewJumpTagList(tagBundler());
  },
  [tagBellyJTT,
tagFreeFlyJTT,
tagWingsuitJTT,
tagBaseJTT,
tagHnPJTT,
tagSwoopJTT,
tagCrwJTT,
tagVfsJTT,
tagMfsJTT,
tagFsJTT,
tagAngleJTT,
tagTrackingJTT,
tagSoloJTT,
tagTandemJTT,
tagAltJTT,
tagBigwayJTT,
tagZooJTT,
tagNightJTT,
tagHighPullJTT,
tagFullJTT,
tagHighJTT,
tagGoodOC,
tagHardOC,
tagOffHeadingOC,
tagOnHeadingOC,
tagPCDelayOC,
tagLineBreakOC,
tagStableOC,
tagUnstableOC,
tagTILSC,
tagVideoLSC,
tagAffiLSC,
tagCoachLSC,
tagOrganizerLSC,
tagJumpMasterLSC,
tagCheckLSC,
tagRecurrencyLSC,
tagStudentLSC,
tagHighWindWTHR,
tagLowWindWTHR,
tagUpWindWTHR,
tagDownWindWTHR,
tagCrossWindWTHR,
tagLongSpotWTHR,
tagRainWTHR,
tagSnowWTHR,
tagCutAwayEMR,
tagOffLandingEMR,
tagAircraftEMR,
tagInjuryEMR,
tagEvaMAL,
tagBiPlaneMAL,
tagDownPlaneMAL,
tagLineOverMAL,
tagSideBySideMAL,
tagStuckSliderMAL,
tagPCInTowMAL,
tagStreamerMAL,
tagHorshoeMAL,
tagPrematureMAL,
tagHardPullMAL,
tagToggleLockMAL,
tagToggleFireMAL,
tagDivingLineTwistMAL,
tagTensionKnotMAL,
tagGroupSize,]);

useEffect(() => {
  getRigs()
  getPlanes();
  getDZs();
}, [])

//api calls

  const getRigs = async () => {
    try {
      const response = await fetch('http://localhost:5009/getrigs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userData.user.id}),
      });
      const returnedData = await response.json();
      if(response.ok){
        let foundRigs = [];
        for (let rig of returnedData.results) {
          foundRigs.push(rig.name);
        }
      console.log('succesfully got user Rigs', foundRigs);
        setRigs([...foundRigs]);
      } else{
        console.error('no rigs imported', response);
      }
    } catch (err) {
      console.error('client failed getting rigs', err);
    }
  };

  const storeRig = async (newRigString) => {
    try {
      const response = await fetch('http://localhost:5009/storerigs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userData.user.id, name: `${newRigString}` }),
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
        body: JSON.stringify({ user_id: userData.user.id}),
      });
      const returnedData = await response.json();
      if(response.ok){
        let foundPlanes = [];
        for (let plane of returnedData.results) {
          foundPlanes.push(plane.name);
        }
      console.log('succesfully got user Planes', foundPlanes);
        setPlanes([...foundPlanes]);
      } else{
        console.error('no Planes imported', response);
      }
    } catch (err) {
      console.error('client failed plane rigs', err)
    }
  };

  const storePlane = async (newPlaneString) => {
    try {
      const response = await fetch('http://localhost:5009/storeplanes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userData.user.id, name: `${newPlaneString}` }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
        alert(returnedDATA.message)
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing plane', err);}
  }

  const getDZs = async () => {
    try {
      const response = await fetch('http://localhost:5009/getdzs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userData.user.id}),
      });
      const returnedData = await response.json();
      if(response.ok){
        let foundDZs = [];
        for (let dz of returnedData.results) {
          foundDZs.push(dz.name);
        }
      console.log('succesfully got user DZ', foundDZs);
        setDZs([...foundDZs]);
      } else{
        console.error('no DZs imported', response);
      }
    } catch (err) {
      console.error('client failed getting DZs', err);
    }
  };

  const storeDZ = async (newRigString) => {
    try {
      const response = await fetch('http://localhost:5009/storedz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userData.user.id, name: `${newRigString}` }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
        alert(returnedDATA.message)
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing rig', err);}
  };


  return(
    <div >
    <br/>
    <br/>
    <div id="inputDashboard" style={widgetStyle}>
      //first row
      <div>

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
        //second row
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

        </form>

        <button style={headerButtonStyle} onClick={handleTagsForm}>Tags{tagsPage ? ' (show)' : ' (hide)'}</button>

        <form style={!tagsPage ? overlayStyle : {display: "none"}}>
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
                <button style={tagNightJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTNight}>Night</button>
                <button style={tagHighPullJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTHighPull}>High Pull</button>
                <button style={tagFullJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTFull}>Full</button>
                <button style={tagHighJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTHigh}>High</button>
              </div>            
            </div>

            <div style={tagListStyle}>

              <button onClick={handleOpenCharTagsForm} style={tagListButtonStyleOC}>Openings{!openCharTagsPage ? ' (show)' : ' (hide)'}</button>

              <div style={openCharTagsPage ? {marginTop: "1.8vh"} : {display: "none"}}>

                <button style={tagGoodOC ? tagButtonOff : tagButtonOn} onClick={tagHandler.OCGood}>Good Opening</button>
                <button style={tagHardOC ? tagButtonOff : tagButtonOn} onClick={tagHandler.OCHard}>Hard Opening</button>
                <button style={tagOffHeadingOC ? tagButtonOff : tagButtonOn} onClick={tagHandler.OCOffHeading}>Off Heading Opening</button>
                <button style={tagOnHeadingOC ? tagButtonOff : tagButtonOn} onClick={tagHandler.OCOnHeading}>On Heading Opening</button>
                <button style={tagPCDelayOC ? tagButtonOff : tagButtonOn} onClick={tagHandler.OCPCDelay}>Pilot Chute Hesitation</button>
                <button style={tagLineBreakOC ? tagButtonOff : tagButtonOn} onClick={tagHandler.OCLineBreak}>Broken Line</button>
                <button style={tagStableOC ? tagButtonOff : tagButtonOn} onClick={tagHandler.OCStable}>Stable Deployment</button>
                <button style={tagUnstableOC ? tagButtonOff : tagButtonOn} onClick={tagHandler.OCUnstable}>Unstable Opening</button>

              </div>

            </div>

            <div style={tagListStyle}>

              <button onClick={handleLiscTagsForm} style={tagListButtonStyleLI}>Liscensces <br />and ratings{!liscTagsPage ? ' (show)' : ' (hide)'}</button>

              <div style={liscTagsPage ? {marginTop: "1.8vh"} : {display: "none"}}>
                <button style={tagTILSC ? tagButtonOff : tagButtonOn} onClick={tagHandler.LSCTI}>Tandem Instructor</button>
                <button style={tagVideoLSC ? tagButtonOff : tagButtonOn} onClick={tagHandler.LSCVideographer}>Videogrpaher</button>
                <button style={tagAffiLSC ? tagButtonOff : tagButtonOn} onClick={tagHandler.LSCAffi}>AFFI</button>
                <button style={tagCoachLSC ? tagButtonOff : tagButtonOn} onClick={tagHandler.LSCCoach}>Coach </button>
                <button style={tagOrganizerLSC ? tagButtonOff : tagButtonOn} onClick={tagHandler.LSCOrganizer}>Organizer</button>
                <button style={tagJumpMasterLSC ? tagButtonOff : tagButtonOn} onClick={tagHandler.LSCJumpMaster}>Jump Master</button>
                <button style={tagCheckLSC ? tagButtonOff : tagButtonOn} onClick={tagHandler.LSCCheck}>Check Dive</button>
                <button style={tagRecurrencyLSC ? tagButtonOff : tagButtonOn} onClick={tagHandler.LSCRecurrency}>Recurrency</button>
                <button style={tagStudentLSC ? tagButtonOff : tagButtonOn} onClick={tagHandler.LSCStudent}>Student</button>

              </div>

            </div>


          </div>


          <div style={tagShellStyle}>


            <div style={tagListStyle}>

              <button onClick={handleGroupTagsForm} style={tagListButtonStyleGRP}>group Size{!groupTagsPage ? ' (show)' : ' (hide)'}</button>

              <div style={groupTagsPage ? {marginTop: "1.8vh"} : {display: "none"}}>
              <input 
                style={GsizeInpStye}
                type="number" 
                value={tagGroupSize} 
                onChange={handleGroupSizeChange}
                placeholder="Group Size (num)"
                />

            </div> 


            </div>

            <div style={tagListStyle}>

              <button onClick={handleCnpyTagsForm} style={tagListButtonStyleCNPY}>Canopy <br /> weather{!cnpyTagsPage ? ' (show)' : ' (hide)'}</button>

              <div style={cnpyTagsPage ? {marginTop: "1.8vh"} : {display: "none"}}>
                <button style={tagHighWindWTHR ? tagButtonOff : tagButtonOn} onClick={tagHandler.WTHRHighWind}>High Winds</button>
                <button style={tagLowWindWTHR ? tagButtonOff : tagButtonOn} onClick={tagHandler.WTHRLowWind}>Low Winds</button>
                <button style={tagUpWindWTHR ? tagButtonOff : tagButtonOn} onClick={tagHandler.WTHRUpWind}>Up Wind Landing</button>
                <button style={tagDownWindWTHR ? tagButtonOff : tagButtonOn} onClick={tagHandler.WTHRDownWind}>Down Wind Landing</button>
                <button style={tagCrossWindWTHR ? tagButtonOff : tagButtonOn} onClick={tagHandler.WTHRCrossWind}>Cross Wind Landing</button>
                <button style={tagLongSpotWTHR ? tagButtonOff : tagButtonOn} onClick={tagHandler.WTHRLongSpot}>Long Spot</button>
                <button style={tagRainWTHR ? tagButtonOff : tagButtonOn} onClick={tagHandler.WTHRRain}>Rain</button>
                <button style={tagSnowWTHR ? tagButtonOff : tagButtonOn} onClick={tagHandler.WTHRSnow}>Snow</button>
              </div> 
          </div>


          </div>


          <div style={tagShellStyle}>

          <div style={tagListStyle}>

            <button onClick={handleEmergencyTagsForm} style={tagListButtonStyleEMER}>Emergencies{!emergencyTagsPage ? ' (show)' : ' (hide)'}</button>

            <div style={emergencyTagsPage ? {marginTop: "1.8vh"} : {display: "none"}}>
              <button style={tagCutAwayEMR ? tagButtonOff : tagButtonOn} onClick={tagHandler.EMRCutAway}>Cut Away</button>
              <button style={tagOffLandingEMR ? tagButtonOff : tagButtonOn} onClick={tagHandler.EMROffLanding}>Off Landing</button>
              <button style={tagAircraftEMR ? tagButtonOff : tagButtonOn} onClick={tagHandler.EMRAircraft}>Aircraft Emergency</button>
              <button style={tagInjuryEMR ? tagButtonOff : tagButtonOn} onClick={tagHandler.EMRInjury}>Injury</button>

            </div> 
          </div>

          <div style={tagListStyle}>

              <button onClick={handleMalfunctionTagsForm} style={tagListButtonStyleMAL}>Malfunctions{!malfunctionTagsPage ? ' (show)' : ' (hide)'}</button>

              <div style={malfunctionTagsPage ? {marginTop: "1.8vh"} : {display: "none"}}>

            </div> 
          </div>

          </div>
          
        </form>
 
      </div>

      <div className="inputContainer">
        //third row
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
          <input 
            type="file" 
            accept="application/pdf"
            style={inputButtonStyle}
            onChange={handleSigFileUpload}

          />
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
        <p>tags:</p>
        
          {tagsPreview}
        
      </div>

      <div className="inputContainer">
        <p>Exit Alt: {newJumpAlt}</p>
        <p>Freefall Time: {newJumpDur}</p>
        <p>Signature Upload: {}</p>
      </div>

    </div>
    </div>
  )

}

export default LogInputWidget;

export function getPallette(){

    const pallette  = ["#22223b", "#4a4e69", "#9a8c98", "#c9ada7", "#f2e9e4"].reverse();  
  return(pallette)
}

