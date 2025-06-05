import {useState, useEffect, } from 'react';
import './style/logInputWidget.css'
import { useAuth } from './contexts/authContext';
import JumpWidget from './components/JumpWidget.jsx'


function LogInputWidget() {

  //get user data
  const userData = useAuth();
  // console.log('Fetched User Data: ',userData.user.id)


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

  const [dzPage, setDzPage] = useState(true);

  const [tagsPage, setTagsPage] = useState(true);


              //tags dropdown
  const [jumpTypeTagsPage, setJumpTypeTagsPage] = useState(false);

  const [openCharTagsPage, setOpenCharTagsPage] = useState(false);

  const [liscTagsPage, setLiscTagsPage] = useState(false);

  const [groupTagsPage, setGroupTagsPage] = useState(false);

  const [cnpyTagsPage, setCnpyTagsPage] = useState(false);

  const [preReqTagsPage, setPreReqTagsPage] = useState(false);

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

  const [newJumpCom, setNewJumpCom] = useState(null);

  //state hooks ^^
  
  //functional elements vv
//page elements

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

  function handlePreReqTagsForm(e) {
    e.preventDefault();
    setPreReqTagsPage(!preReqTagsPage);
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

  function handleComForm (e) {
    setNewJumpCom(e.target.value)
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
    // console.log("Clicked DZ value:", e.target.value);
    setNewJumpDZ(e.target.value);
  }

  function handleJumpAircraftChange(e) {
    // console.log("Clicked Aircraft value:", e.target.value);
    setNewJumpAircraft(e.target.value);
  }  

  function handleJumpRigChange(e) {
    // console.log("Clicked Rig value:", e.target.value);
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

  //tags state and logic VV   (info: info bundled b tagBulder() - state variables for selector buttons and output check)

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
  const [tagBigwayJTT, setTagBigwayJTT] = useState(true);
  const [tagZooJTT, setTagZooJTT] = useState(true);
  const [tagNightJTT, setTagNightJTT] = useState(true);
  const [tagHighPullJTT, setTagHighPullJTT] = useState(true);
  const [tagHighJTT, setTagHighJTT] = useState(true);


                    //OPENINGS
  const [tagGoodOC, setTagGoodOC] = useState(true);
  const [tagHardOC, setTagHardOC] = useState(true);
  const [tagOffHeadingOC, setTagOffHeadingOC] = useState(true);
  const [tagPCDelayOC, setTagPCDelayOC] = useState(true);
  const [tagLineBreakOC, setTagLineBreakOC] = useState(true);
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

                    //Pre reqs
  const [tagAcc33REQ, setTagAcc33REQ] = useState(true);
  const [tagAcc7REQ, setTagAcc7REQ] = useState(true);
  const [tagDemoREQ, setTagDemoREQ] = useState(true);
  const [tagWaterREQ, setTagWaterREQ] = useState(true);
  const [tagNightREQ, setTagNightREQ] = useState(true);


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
    OCPCDelay: (e) => {
      e.preventDefault();
      setTagPCDelayOC(!tagPCDelayOC);
    },
    OCLineBreak: (e) => {
      e.preventDefault();
      setTagLineBreakOC(!tagLineBreakOC);
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
    REQAcc33: (e) => {
      e.preventDefault();
      setTagAcc33REQ(!tagAcc33REQ);
    },
    REQAcc7: (e) => {
      e.preventDefault();
      setTagAcc7REQ(!tagAcc7REQ);
    },
    REQDemo: (e) => {
      e.preventDefault();
      setTagDemoREQ(!tagDemoREQ);
    },
    REQWater: (e) => {
      e.preventDefault();
      setTagWaterREQ(!tagWaterREQ);
    },
    REQNight: (e) => {
      e.preventDefault();
      setTagNightREQ(!tagNightREQ);
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
    top: "13%",
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
    top: "2vh",
    right: "2vw",
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
    !tagHnPJTT         ? { name: 'Hop and Pop',              cat: 'JTT' } : null,
    !tagSwoopJTT       ? { name: 'Swoop',            cat: 'JTT' } : null,
    !tagCrwJTT         ? { name: 'CRW',              cat: 'JTT' } : null,
    !tagVfsJTT         ? { name: 'VFS',              cat: 'JTT' } : null,
    !tagMfsJTT         ? { name: 'MFS',              cat: 'JTT' } : null,
    !tagFsJTT          ? { name: 'FS',               cat: 'JTT' } : null,
    !tagAngleJTT       ? { name: 'Angle',            cat: 'JTT' } : null,
    !tagTrackingJTT    ? { name: 'Tracking',         cat: 'JTT' } : null,
    !tagSoloJTT        ? { name: 'Solo',             cat: 'JTT' } : null,
    !tagTandemJTT      ? { name: 'Tandem Ride',           cat: 'JTT' } : null,
    !tagBigwayJTT      ? { name: 'Big-Way',           cat: 'JTT' } : null,
    !tagZooJTT         ? { name: 'Zoo',              cat: 'JTT' } : null,
    !tagNightJTT       ? { name: 'Night',            cat: 'JTT' } : null,
    !tagHighPullJTT    ? { name: 'High-Pull',         cat: 'JTT' } : null,
    !tagHighJTT        ? { name: 'High-Altitude',             cat: 'JTT' } : null,

    !tagGoodOC         ? { name: 'Good Opening',             cat: 'OC'  } : null,
    !tagHardOC         ? { name: 'Hard Opening',             cat: 'OC'  } : null,
    !tagOffHeadingOC   ? { name: 'Off Heading',       cat: 'OC'  } : null,
    !tagPCDelayOC      ? { name: 'Piolot Chute Delay',          cat: 'OC'  } : null,
    !tagLineBreakOC    ? { name: 'Line Break',        cat: 'OC'  } : null,
    !tagUnstableOC     ? { name: 'Unstable Deployment',         cat: 'OC'  } : null,

    !tagTILSC          ? { name: 'TI Jump',               cat: 'LSC' } : null,
    !tagVideoLSC       ? { name: 'Videogrpaher Jump',            cat: 'LSC' } : null,
    !tagAffiLSC        ? { name: 'AFFI Jump',             cat: 'LSC' } : null,
    !tagCoachLSC       ? { name: 'Coach Jump',            cat: 'LSC' } : null,
    !tagOrganizerLSC   ? { name: 'Organizer Jump',        cat: 'LSC' } : null,
    !tagJumpMasterLSC  ? { name: 'JumpMaster',       cat: 'LSC' } : null,
    !tagCheckLSC       ? { name: 'Check Jump',            cat: 'LSC' } : null,
    !tagRecurrencyLSC  ? { name: 'Recurrency Jump',       cat: 'LSC' } : null,
    !tagStudentLSC     ? { name: 'Student Jump',          cat: 'LSC' } : null,

    !tagHighWindWTHR   ? { name: 'High-Wind',         cat: 'WTHR'} : null,
    !tagLowWindWTHR    ? { name: 'Low-Wind',          cat: 'WTHR'} : null,
    !tagDownWindWTHR   ? { name: 'Down-Wind Landing',         cat: 'WTHR'} : null,
    !tagCrossWindWTHR  ? { name: 'Cross-Wind Landing ',        cat: 'WTHR'} : null,
    !tagLongSpotWTHR   ? { name: 'Long-Spot',         cat: 'WTHR'} : null,
    !tagRainWTHR       ? { name: 'Rain',             cat: 'WTHR'} : null,
    !tagSnowWTHR       ? { name: 'Snow',             cat: 'WTHR'} : null,

    !tagCutAwayEMR     ? { name: 'Cut-Away',          cat: 'EMR' } : null,
    !tagOffLandingEMR  ? { name: 'Off-Landing',       cat: 'EMR' } : null,
    !tagAircraftEMR    ? { name: 'Aircraft Emergency',         cat: 'EMR' } : null,
    !tagInjuryEMR      ? { name: 'Injury',           cat: 'EMR' } : null,

    !tagEvaMAL         ? { name: 'Bag Lock',              cat: 'MAL' } : null,
    !tagBiPlaneMAL     ? { name: '2 out (Bi-Plane)',          cat: 'MAL' } : null,
    !tagDownPlaneMAL   ? { name: '2 out (Down-Plane)',        cat: 'MAL' } : null,
    !tagLineOverMAL    ? { name: 'Line Over',         cat: 'MAL' } : null,
    !tagSideBySideMAL  ? { name: 'Side By Side',       cat: 'MAL' } : null,
    !tagStuckSliderMAL ? { name: 'Stuck Slider',      cat: 'MAL' } : null,
    !tagPCInTowMAL     ? { name: 'Piolot Chute In Tow',          cat: 'MAL' } : null,
    !tagStreamerMAL    ? { name: 'Streamer',         cat: 'MAL' } : null,
    !tagHorshoeMAL     ? { name: 'Horshoe',          cat: 'MAL' } : null,
    !tagPrematureMAL   ? { name: 'Premature Deployment',        cat: 'MAL' } : null,
    !tagHardPullMAL    ? { name: 'Hard-Pull',         cat: 'MAL' } : null,
    !tagToggleLockMAL  ? { name: 'Toggle Lock',       cat: 'MAL' } : null,
    !tagToggleFireMAL  ? { name: 'Toggle Fire',       cat: 'MAL' } : null,
    !tagDivingLineTwistMAL ? { name: 'Diving Line Twist',   cat: 'MAL' } : null,
    !tagTensionKnotMAL ? { name: 'Tension Knot',      cat: 'MAL' } : null,

    !tagAcc33REQ ? {name: 'Accuracy (Within 33ft)',      cat: 'REQ'} : null,
    !tagAcc7REQ ? {name: 'Accuracy (Within 7ft)', cat: 'REQ'} : null,
    !tagDemoREQ ? {name: 'Demo Jump', cat: 'REQ'} : null,
    !tagWaterREQ ? {name: 'Intentional Water Landing ', cat: 'REQ'} : null,
    !tagNightREQ ? {name: 'Night Jump',      cat: 'REQ'} : null,


    tagGroupSize > 1   ? { name: `${tagGroupSize}-Way`, value: tagGroupSize,        cat: 'GROUP' } : null
  ];
  const filteredNullBundle = tagBundleAll.filter(item => item !== null);
  const filteredBundle = filteredNullBundle.map(item => item.name);
  setNewJumpTagList([...tagBundleAll.filter(item => item !== null)]);
  setTagsPreview(tagBundleAll.filter(item => item !== null).map((tag, idx) => {
    return(
      <div style={{margin: "0", fontSize: ".6em", padding: "0"}}key={idx}>
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
  [tagsPage,
tagBellyJTT,
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
tagBigwayJTT,
tagZooJTT,
tagNightJTT,
tagHighPullJTT,
tagHighJTT,
tagGoodOC,
tagHardOC,
tagOffHeadingOC,
tagPCDelayOC,
tagLineBreakOC,
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
tagAcc7REQ,
tagAcc33REQ,
tagDemoREQ,
tagWaterREQ,
tagNightREQ,
tagGroupSize,]);

useEffect(() => {
  getRigs()
  getPlanes();
  getDZs();
}, [])

//api calls

  function fileToBase64(pdfFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => {
      reader.abort();
      reject(new Error('Error reading file.'));
    };
    reader.onload = () => {
      // reader.result is something like "data:application/pdf;base64,JVBERi0xLjcK..."
      // If you only want the raw Base64 (no "data:...;base64," prefix),
      // you can strip everything up to “,”.
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.readAsDataURL(pdfFile);
  });
}

//input info

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
        setDZs([...foundDZs]);
      } else{
        console.error('no DZs imported', response);
      }
    } catch (err) {
      console.error('client failed getting DZs', err);
    }
  };

  const storeDZ = async (newDzString) => {
    try {
      const response = await fetch('http://localhost:5009/storedz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userData.user.id, name: `${newDzString}` }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
        alert(returnedDATA.message)
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing DZ', err);}
  };

//store jump route

const storeJump = async (newJumpNum, newJumpDate, newJumpDZ, newJumpAircraft, newJumpRig, newJumpAlt, newJumpDur,newJumpCom, newJumpSigUpload, newJumpTagList) => {
  try {
    const base64Signature = await fileToBase64(newJumpSigUpload)
    const response = await fetch('http://localhost:5009/storejump', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userData.user.id,
        jump_num: newJumpNum,
        jump_date: newJumpDate,
        dz: newJumpDZ,
        aircraft: newJumpAircraft,
        equipment: newJumpRig,
        alt: newJumpAlt,
        t: newJumpDur,
        notes: newJumpCom,
        pdfSig: base64Signature,
        tags: newJumpTagList
      })
    });
    const responseData = await response.json();
    if(responseData.ok){
      alert(responseData.message);
      setNewJumpNum(null);
      setNewJumpDate(null);
      setNewJumpDZ(null);
      setNewJumpAircraft(null);
      setNewJumpRig(null);
      setNewJumpAlt(null);
      setNewJumpDur(null);
      setNewJumpCom(null);
      setNewJumpSigUpload(null);
      setNewJumpTagList([])

    } else {
      alert(responseData.message);
      console.error(responseData.error)

    }
  } catch (err) {console.error('client failed storing jump', err);}
}

  //revised Div Styles

  const shell = {
    background: pallette[0],
    borderRadius: "1em",
    padding: "1em"
  };

    const headerStyle = {
    fontFamily: "L1",
    fontSize: "1.2em",
    color: pallette[4],
    background: pallette[2],
    borderRadius: "1em",
    padding: ".3em",
  };

  const headerButtonStyle = {
    background: pallette[0],
    border: "solid",
    borderColor: pallette[4],
    borderRadius: "1.5vw",
    padding: ".5vw",
    fontFamily: "L1",
    color: pallette[4],
  };

  const inputButtonStyle = {
      color: pallette[0],
      border: "0",
      borderColor: pallette[4],
      borderRadius: "1.5vw",
      padding: "0",
      margin: "0",
     fontFamily: "L1",
     color: pallette[4],
  };

  const formStyle = {
    display: "block", 
    textAlignLast: "center", 
    fontFamily: "L1", 
    color: pallette[4],
    fontSize: "1.4vw"
  };

  const inputSection = {
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-evenly"
  };

  const rowStyle = {
    display: "flex", 
    justifyContent: "space-evenly", 
    margin: "1vh", padding: ".5em", 
    background: pallette[1], 
    borderRadius:".3em" 
  };

  //jump upload



  function handleJumpUpload (e) {
    e.preventDefault();
    if (newJumpNum <= 0){
      return alert('Jump Number is missing or invalid');
    };
    if (newJumpDate === null){
      return alert('Jump Date is missing or invalid');
    };
    if (newJumpDZ === null){
      return alert('Dropzone is missing');
    };
    if (newJumpAircraft === null){
      return alert('Aircraft is missing');
    };
    if (newJumpRig === null){
      return alert('Rig is missing');
    };
    if (newJumpAlt < 1){
      return  alert('Exit Altitude is missing or invalid');
    };
    if (newJumpDur === null){
      return
    };
    if (newJumpSigUpload === null){
      return
    };

    storeJump(newJumpNum, newJumpDate, newJumpDZ, newJumpAircraft, newJumpRig, newJumpAlt, newJumpDur,newJumpCom, newJumpSigUpload, newJumpTagList)

  }


  return(
    <div >
    <br/>
    <br/>

    <div style={shell}>

      {/* title */}
      <div style={rowStyle}>
        <h1 style={{fontFamily: "L1", padding: ".2em", color: pallette[4],fontSize: "2em"}}>Add Jump</h1>
      </div>

          {/* first row*/}
          <div style={rowStyle}>
            {/* jump num */}
            <div style={inputSection}>
              <h3 style={headerStyle}>Jump Number</h3>
                <input 
                  type="number" 
                  placeholder="Jump #"
                  value={newJumpNum}
                  onChange={handleJumpNumChange}
                />
            </div>

          {/* jump date */}
          <div style={inputSection}>
            <h3 style={headerStyle}>Jump Date</h3>
              <input 
                type="date" 
                value={newJumpDate}
                onChange={handleJumpDateChange}
              />
          </div>


          </div>

          {/* second row */}
          <div style={rowStyle}>
            {/* DZ */}
          <div style={inputSection}>
              <button onClick={handleDzForm}style={headerButtonStyle}>Drop-Zone{!dzPage ? "(hide)" : "(show)"}</button>
              <form style={!dzPage ? formStyle : {display: "none"}}>
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


            {/* Aircraft */}
          <div style={inputSection}>
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
          </div>


            {/* equipment */}
          <div style={inputSection}>
            <button style={headerButtonStyle} onClick={handleEquipmentForm}>Equipment{eqpmPage ? ' (show)' : ' (hide)'}</button>
          <form style ={eqpmPage ? {display: "none"} : {display: "block"}}>
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



          </div>


          {/* third row */}
        <div style={rowStyle}>

          {/*Exit alt*/}
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

            {/* FF time */}
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

          
          {/* fourth row */}
        <div style={rowStyle}>
          

          {/* notes */}
          <div style={inputSection}>
            <h3 style={headerStyle}>
            Notes
          </h3>
          <textarea 
            style={{maxHeight: "2em"}}
            type="number" 
            placeholder="notes"
            rows="10"
            cols="25"
            maxLength="250"
            value={newJumpCom}
            onChange={handleComForm}
          />
          </div>


          {/* tags */}
          <div style={inputSection}>
            <button style={headerButtonStyle} onClick={handleTagsForm}>Tags{tagsPage ? ' (show)' : ' (hide)'}</button>
          </div>

        <form style={!tagsPage ? overlayStyle : {display: "none"}}>
          <h3 style={tagsHeaderStyle}>Select Tags for This Jump</h3>
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
                <button style={tagBigwayJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTBigway}>Big Way</button>
                <button style={tagZooJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTZoo}>Zoo</button>
                <button style={tagNightJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTNight}>Night</button>
                <button style={tagHighPullJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTHighPull}>High Pull</button>
                <button style={tagHighJTT ? tagButtonOff : tagButtonOn} onClick={tagHandler.JTHigh}>High</button>
              </div>            
            </div>

            <div style={tagListStyle}>

              <button onClick={handleOpenCharTagsForm} style={tagListButtonStyleOC}>Openings{!openCharTagsPage ? ' (show)' : ' (hide)'}</button>

              <div style={openCharTagsPage ? {marginTop: "1.8vh"} : {display: "none"}}>

                <button style={tagGoodOC ? tagButtonOff : tagButtonOn} onClick={tagHandler.OCGood}>Good Opening</button>
                <button style={tagHardOC ? tagButtonOff : tagButtonOn} onClick={tagHandler.OCHard}>Hard Opening</button>
                <button style={tagOffHeadingOC ? tagButtonOff : tagButtonOn} onClick={tagHandler.OCOffHeading}>Off Heading Opening</button>
                <button style={tagPCDelayOC ? tagButtonOff : tagButtonOn} onClick={tagHandler.OCPCDelay}>Pilot Chute Hesitation</button>
                <button style={tagLineBreakOC ? tagButtonOff : tagButtonOn} onClick={tagHandler.OCLineBreak}>Broken Line</button>
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
                />

            </div> 


            </div>

            <div style={tagListStyle}>

              <button onClick={handleCnpyTagsForm} style={tagListButtonStyleCNPY}>Canopy <br /> weather{!cnpyTagsPage ? ' (show)' : ' (hide)'}</button>

              <div style={cnpyTagsPage ? {marginTop: "1.8vh"} : {display: "none"}}>
                <button style={tagHighWindWTHR ? tagButtonOff : tagButtonOn} onClick={tagHandler.WTHRHighWind}>High Winds</button>
                <button style={tagLowWindWTHR ? tagButtonOff : tagButtonOn} onClick={tagHandler.WTHRLowWind}>Low Winds</button>
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
                <button style={tagEvaMAL ? tagButtonOff : tagButtonOn} onClick={tagHandler.MALEva}>Bag Lock</button>
                <button style={tagBiPlaneMAL ? tagButtonOff : tagButtonOn} onClick={tagHandler.MALBiPlane}>2 out (bi-plane)</button>
                <button style={tagLineOverMAL ? tagButtonOff : tagButtonOn} onClick={tagHandler.MALBiPlane}>Line Over</button>
                <button style={tagSideBySideMAL ? tagButtonOff : tagButtonOn} onClick={tagHandler.MALSideBySIde}>2 out (Side by Side)</button>
                <button style={tagStuckSliderMAL ? tagButtonOff : tagButtonOn} onClick={tagHandler.MALStuckSlider}>Hung Slider</button>
                <button style={tagPCInTowMAL ? tagButtonOff : tagButtonOn} onClick={tagHandler.MALPCInTow}>Piolot Chute in Tow</button>
                <button style={tagStreamerMAL ? tagButtonOff : tagButtonOn} onClick={tagHandler.MALStreamer}>Streamer</button>
                <button style={tagHorshoeMAL ? tagButtonOff : tagButtonOn} onClick={tagHandler.MALHorshoe}>Horshoe</button>
                <button style={tagPrematureMAL ? tagButtonOff : tagButtonOn} onClick={tagHandler.MALPremature}>Premature Deployment</button>
                <button style={tagHardPullMAL ? tagButtonOff : tagButtonOn} onClick={tagHandler.MALHardPull}>Hard Pull</button>
                <button style={tagToggleLockMAL ? tagButtonOff : tagButtonOn} onClick={tagHandler.MALToggleLock}>Toggle Lock</button>
                <button style={tagToggleFireMAL ? tagButtonOff : tagButtonOn} onClick={tagHandler.MALToggleFire}>Toggle Fire</button>
                <button style={tagDivingLineTwistMAL ? tagButtonOff : tagButtonOn} onClick={tagHandler.MALDivingLineTwist}>Diving Line Twist</button>
                <button style={tagTensionKnotMAL ? tagButtonOff : tagButtonOn} onClick={tagHandler.MALTensionKnot}>Tension knot</button>
            </div> 
          </div>

          <div style={tagListStyle}>

            <button onClick={handlePreReqTagsForm} style={tagListButtonStyleEMER}>Emergencies{!emergencyTagsPage ? ' (show)' : ' (hide)'}</button>

            <div style={preReqTagsPage ? {marginTop: "1.8vh"} : {display: "none"}}>
              <button style={tagAcc33REQ ? tagButtonOff : tagButtonOn} onClick={tagHandler.REQAcc33}>Accuracy Landing (within 33ft)</button>
              <button style={tagAcc7REQ ? tagButtonOff : tagButtonOn} onClick={tagHandler.REQAcc7}>Accuracy Landing (within 7ft)</button>
              <button style={tagDemoREQ ? tagButtonOff : tagButtonOn} onClick={tagHandler.REQDemo}>Demo Jump</button>
              <button style={tagWaterREQ ? tagButtonOff : tagButtonOn} onClick={tagHandler.REQWater}>Intentional Water Landing</button>
              <button style={tagNightREQ ? tagButtonOff : tagButtonOn} onClick={tagHandler.REQNight}>Night Jump</button>

            </div> 
          </div>

          </div>
          
        </form>


        </div>


        {/* final */}
        <div style={rowStyle}>


          {/* LB signature */}
          <div style={{marginRight: "1.5em"}}>
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

          {/* upload skydive */}

          <div style={inputSection}>
            <button style={headerButtonStyle} onClick={handleJumpUpload}>Upload Skydive</button>
          </div>


        </div>

        {/* output */}

        <p style={headerStyle}>Output Preview</p>

          <div>
      <JumpWidget 
            jumpNum={newJumpNum}
            jumpDate={newJumpDate}
            dz={newJumpDZ}
            aircraft={newJumpAircraft}
            rig={newJumpRig}
            exitAlt={newJumpAlt}
            time={newJumpDur}
            notes={newJumpCom}
            signature={newJumpSigUpload}
            tags={tagsPreview}
        
          />
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

