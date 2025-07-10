import {useState, useEffect} from 'react';
import {getPallette} from "../logInputWidget";
import '../style/loginScreen.css';

//jumps={userJumpHistory} user={user} jump_num={userJumpCount}

function StatsPage(props) {

   const svr = import.meta.env.VITE_SVR_URL;

   //environment
   

   const pallette = getPallette()

   const jumps = props.jumps

   // const jumps= [{ 
   //    jump_num: 9, 
   //    jump_date: "2025-06-17", 
   //    dz: "Connecticut Parachutists", 
   //    aircraft: "Cessna 206", 
   //    equipment: "Navigator 220", 
   //    alt: 4, 
   //    t: 7,
   //    notes: "hello retard" ,
   // },
   // { 
   //    jump_num: 8, 
   //    jump_date: "2025-04-12", 
   //    dz: "Connecticut Parachutists", 
   //    aircraft: "Caravan", 
   //    equipment: "Vector 3 Storm 190", 
   //    alt: 5000, 
   //    t: 30,
   //    notes: "hello retard" ,
   // },
   // { 
   //    jump_num: 7, 
   //    jump_date: "2025-02-25", 
   //    dz: "Jumptown", 
   //    aircraft: "Cessna 182", 
   //    equipment: "Tandem Harness!!", 
   //    alt: 10293, 
   //    t: 56,
   //    notes: "hello retard" ,
   // },
   // { 
   //    jump_num: 6, 
   //    jump_date: "2025-01-01", 
   //    dz: "Connecticut Parachutists", 
   //    aircraft: "Cessna 206", 
   //    equipment: "Tandem Harness!!", 
   //    alt: 4000, 
   //    t: 70,
   //    notes: "hello retard" ,
   // },
   // { 
   //    jump_num: 5, 
   //    jump_date: "2025-01-01", 
   //    dz: "Connecticut Parachutists", 
   //    aircraft: "Cessna 206", 
   //    equipment: "Tandem Harness!!", 
   //    alt: 4000, 
   //    t: 70,
   //    notes: "hello retard" ,
   // },
   // { 
   //    jump_num: 4, 
   //    jump_date: "2025-01-01", 
   //    dz: "Connecticut Parachutists", 
   //    aircraft: "Cessna 206", 
   //    equipment: "Tandem Harness!!", 
   //    alt: 4000, 
   //    t: 70,
   //    notes: "hello retard" ,
   // },
   // { 
   //    jump_num: 3, 
   //    jump_date: "2025-01-01", 
   //    dz: "Connecticut Parachutists", 
   //    aircraft: "Cessna 206", 
   //    equipment: "Tandem Harness!!", 
   //    alt: 4000, 
   //    t: 70,
   //    notes: "hello retard" ,
   // },
   // { 
   //    jump_num: 2, 
   //    jump_date: "2023-01-01", 
   //    dz: "Connecticut Parachutists", 
   //    aircraft: "Cessna 206", 
   //    equipment: "Tandem Harness!!", 
   //    alt: 4000, 
   //    t: 70,
   //    notes: "hello retard" ,
   // },
   // { 
   //    jump_num: 1, 
   //    jump_date: "2022-01-01", 
   //    dz: "Connecticut Parachutists", 
   //    aircraft: "Cessna 206", 
   //    equipment: "Tandem Harness!!", 
   //    alt: 4000, 
   //    t: 70,
   //    notes: "hello retard" ,
   // }]

   const user = props.user

   // const user = { ID : 1 }

   const jump_num = props.jump_num

   //state

   const [rigs, setRigs] = useState('No saved rigs yet');

   const [planes, setPlanes] = useState('No saved planes yet');

   const [DZs, setDZs] = useState('No saved dropzones yet');

   const [tags, setTags] = useState([])

   const [dzPage, setDzPage] = useState(false);

   const [rigPage, setRigPage] = useState(false);

   const [planePage, setPlanePage] = useState(false);

   const [tagsPage, setTagsPage] = useState(false);


   const [favRig, setFavRig] = useState(null); 

   const [favPlane, setFavPlane] = useState(null);

   const [favDZ, setFavDZ] = useState(null);


   const [favRigNum, setFavRigNum] = useState(0); 

   const [favPlaneNum, setFavPlaneNum] = useState(0);

   const [favDZNum, setFavDZNum] = useState(0);


   const [JTTField, setJTTField] = useState(false);
   const [OCField, setOCField] = useState(false);
   const [LSCField, setLSCField] = useState(false);
   const [GROUPField, setGROUPField] = useState(false);
   const [WTHRField, setWTHRField] = useState(false);
   const [EMRField, setEMRField] = useState(false);
   const [MALField, setMALField] = useState(false);
   const [REQField, setREQField] = useState(false);

   //handlers

   function handledzPage (e) {
      e.preventDefault();

      setPlanePage(false);
      setRigPage(false);

      setDzPage(!dzPage);
   }

   function handleRigPage (e) {
      e.preventDefault();

      setPlanePage(false);
      setDzPage(false);

      setRigPage(!rigPage);
   }

   function handlePlanePage (e) {
      e.preventDefault();

      setDzPage(false);
      setRigPage(false);

      setPlanePage(!planePage);
   }

   function handleTagsPage (e) {
      e. preventDefault();

      setDzPage(false);
      setRigPage(false);
      setPlanePage(false);

      handleCollapseAllTags()

      setTagsPage(!tagsPage);
   }



   function handleCollapseAllTags () {
      setJTTField(false);
      setOCField(false);
      setLSCField(false);
      setGROUPField(false);
      setWTHRField(false);
      setEMRField(false);
      setMALField(false);
      setREQField(false);
   }

   function handleJTTPage(e) {
      e.preventDefault()

      handleCollapseAllTags()

      setJTTField(true)
   }

   function handleOCPage(e) {
      e.preventDefault()

      handleCollapseAllTags()

      setOCField(true)
   }

   function handleLSCPage(e) {
      e.preventDefault()

      handleCollapseAllTags()

      setLSCField(true)
   }

   function handleGROUPPage(e) {
      e.preventDefault()

      handleCollapseAllTags()

      setGROUPField(true)
   }

   function handleWTHRPage(e) {
      e.preventDefault()

      handleCollapseAllTags()

      setWTHRField(true)
   }

   function handleEMRPage(e) {
      e.preventDefault()

      handleCollapseAllTags()

      setEMRField(true)
   }

   function handleMALPage(e) {
      e.preventDefault()

      handleCollapseAllTags()

      setMALField(true)
   }

   function handleREQPage(e) {
      e.preventDefault()

      handleCollapseAllTags()

      setREQField(true)
   }

   //style

   const headerStyle = {
      width: "100%",
      fontFamily: "L1",
      color: pallette[0],
      textAlign: "center",
      fontSize: "3em",
      margin: "0"
   }

   const headerSubStyle = {
      width: "100%",
      fontFamily: "L1",
      color: pallette[0],
      textAlign: "center",
      fontSize: "2em",
      margin: "0"
   }

   const shell = {
      marginTop: "5em",
      marginLeft: "5em",
      marginRight: ".5em",
      minHeight: "90vh"
   }

   const section = { 
      display: "flex",
      justifyContent: "space-evenly"
   }

   const sectionBar = { 
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      paddingBottom: "7px",
      background: pallette[3],
   }

   const sectionBarPB = { 
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      paddingBottom: "7px",
      background: pallette[3],
      alignItems: "center",
   }

   const sectionBack = { 
      width: "100%",
      display: "flex",
      alignItems: "left",
      paddingTop: "7px",
      paddingBottom: "0px",
      background: pallette[3],
   }

   const sectionList = { 
      width: "100%",
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      paddingTop: "7px",
      paddingBottom: "7px",
      background: pallette[3],
   }

   const contentSection = { 
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      justifyContent: "center",
      border:`solid ${pallette[3]} 7px`,
      borderRadius: "1em",
      margin: ".75em"
   }

   const textStyle = {
      fontFamily: "L1",
      fontSize: ".7em",
      margin: "0",
      background: pallette[4],
      borderRadius: "1em",
      color: pallette[1],
      width: "27%",
      padding: ".7em",
      textAlign: "left",
   }

   const textStyle2 = {
      fontFamily: "L1",
      fontSize: "1.2em",
      margin: "0",
      background: pallette[4],
      borderRadius: "1em",
      color: pallette[1],
      minWidth: "auto",
      padding: ".7em",
      textAlign: "left",
   }

   const textStyle1 = {
      fontFamily: "L1",
      fontSize: "1em",
      margin: "0",
      background: pallette[4],
      borderRadius: "1em",
      color: pallette[1],
      minWidth: "fit-content",
      padding: ".35em",
      paddingRight: ".45em",
      textAlign: "left",
   }

   const textStyleProps = {
      fontFamily: "L1",
      fontSize: "1.5em",
      paddingLeft: ".5em",
      paddingRight: ".5em",
      margin: ".5em",
      background: pallette[1],
      borderRadius: ".1em",
      color: pallette[4],
      textAlign: "center",
   }

   const npButton = {
      border: "none",
      marginTop: "1em",
      marginBottom: ".3em",
      fontFamily: "L1",
      width: "50%",
      borderRadius: "1em",
      paddingBottom: ".2em",
      background: pallette[2],
      color: pallette[4],
   }

   const ddButton = {
      border: "none",
      marginTop: "1em",
      marginBottom: "1em",
      fontFamily: "L1",
      width: "20%",
      borderRadius: ".9em",
      paddingBottom: ".2em",
      background: pallette[2],
      color: pallette[4],
   }

   const dd1Button = {
      border: "none",
      marginTop: "1em",
      marginBottom: "1em",
      fontFamily: "L1",
      width: "20%",
      borderRadius: ".9em",
      paddingBottom: ".2em",
      background: pallette[0],
      color: pallette[4],
   }

   const ttButton = {
      border: "none",
      margin: "1em",
      fontFamily: "L1",
      fontSize: ".8em",
      width: "17em",
      borderRadius: ".9em",
      paddingBottom: ".2em",
      background: pallette[2],
      color: pallette[4],
   }

   const ttButton1 = {
      border: "none",
      margin: "1em",
      fontFamily: "L1",
      fontSize: ".8em",
      width: "17em",
      borderRadius: ".9em",
      paddingBottom: ".2em",
      background: pallette[0],
      color: pallette[4],
   }

   const listDiv = {
    display: "flex", 
    alignItems: "center", 
    justifyContent: "space-between", 
    width: "80%", 
    borderRadius: "1em", 
    background: pallette[4], 
    paddingRight: "1em", 
    margin: ".3em"
  }

  const rlStyle = {
   fontFamily: "L1",
   fontSize: "1.1em",
   paddingLeft: ".7em",
   paddingBottom: "0em",
   color: pallette[0]
   }

   const nestedButton = {
      border: "none",
      fontSize: ".6em",
      fontFamily: "L1",
      borderRadius: "1em",
      paddingBottom: ".4em",
      background: pallette[4],
      color: pallette[1],
      marginLeft: ".6em",
      marginBottom: "1.6em",
      width: "6em"
   }

   const pgsBarBG = {
      background: pallette[4],
      borderRadius: "1.5em",
      height: "1.75em",
      width: "50%",
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
      paddingTop: '.3em',
      paddingBottom: '.35em',
   }

   function getLSCpercent(lsc) {
      if (lsc === 'a') {
         if (jump_num >= 25) return '100%' ; 
         else return `${(jump_num / 25) * 100}%`;
      }
      if (lsc === 'b') {
         if (jump_num >= 50) return '100%';
         else return `${(jump_num / 50) * 100}%`;
      }
      if (lsc === 'c') {
         if (jump_num >= 200) return 'complete';
         else return `${(jump_num / 200) * 100}%`
      }
      if (lsc === 'd') {
         if (jump_num >= 500) return 'complete';
         else return `${(jump_num / 500) * 100}%`
      }
   }

   function getLSCptg (lsc) {
      if (lsc === 'a') {
         if (jump_num >= 25) return 'complete';
         else return `${Math.floor((jump_num / 25 * 100))}%`
      }
      if (lsc === 'b') {
         if (jump_num >= 50) return 'complete';
         else return `${Math.floor((jump_num / 50 * 100))}%`
      }
      if (lsc === 'c') {
         if (jump_num >= 200) return 'complete';
         else return `${(Math.floor(jump_num / 200 * 100))}%`
      }
      if (lsc === 'd') {
         if (jump_num >= 500) return 'complete';
         else return `${Math.floor((jump_num / 500 * 100))}%`
      }
   }

   const progressALSC = {
      background: pallette[1],
      borderRadius: "1em",
      height: "1.75em",
      width: getLSCpercent('a'),
      margin: '.3em',
      display: "flex",
      alignItems: "center"
      
   }
   const progressBLSC = {
      background: pallette[1],
      borderRadius: "1em",
      height: "1.75em",
      width: getLSCpercent('b'),
      margin: '.3em',
      display: "flex",
      alignItems: "center"
      
   }
   const progressCLSC = {
      background: pallette[1],
      borderRadius: "1em",
      height: "1.75em",
      width: getLSCpercent('c'),
      margin: '.3em',
      display: "flex",
      alignItems: "center"
      
   }
   const progressDLSC = {
      background: pallette[1],
      borderRadius: "1em",
      height: "1.75em",
      width: getLSCpercent('d'),
      margin: '.3em',
      display: "flex",
      alignItems: "center"
      
   }


   //data consolidation

   function getTotalFFT() {
      let totalJumpT = 'loading';
      let min = '';
      let sec = '';
      if (Array.isArray(jumps)) {
         totalJumpT = 0;
         min = 0;
         sec = 0;
         for (let jump of jumps) {
            totalJumpT = totalJumpT + jump.t
            
         }
         sec = Math.floor((totalJumpT % 3600) % 60)
         min = Math.floor((totalJumpT % 3600) / 60);
         totalJumpT = Math.floor(totalJumpT / 3600);
      }
      return `${totalJumpT}:${min}:${sec}`
   }

   function getTotalAlt() {
      let totalAlt = 'loading';
      let ft;

      if (Array.isArray(jumps)) {
         totalAlt = 0;
         ft = 0;
         for (let j of jumps) {
            totalAlt = totalAlt + j.alt
         }
         ft = Math.floor(totalAlt % 5280);
         totalAlt = Math.floor(totalAlt / 5280) 
         
      }

      return `${totalAlt} mi : ${ft} ft`
   }

   function getFirstJump() {
      let firstJumpDate = 'loading';
      if (Array.isArray(jumps) && jumps.length > 0) {
         firstJumpDate = jumps[jumps.length - 1].jump_date.slice(0, 10)
         
      }

      if (Array.isArray(jumps)){ 
        if (jumps.length === 0) {
            firstJumpDate = 'none'
         } 
      }

      

      return firstJumpDate
   }

   function getLastJump() {
      let LastJumpDate = 'loading';
      if (Array.isArray(jumps) && jumps.length > 0) {
         LastJumpDate = jumps[0].jump_date.slice(0, 10)

      }

      if (Array.isArray(jumps)){ 
        if (jumps.length === 0) {
            LastJumpDate = 'none';
         } 
      }

      return LastJumpDate
   }



   function getRigJumpCount (rig) {
      let count = 0;
      if (Array.isArray(jumps)){
         for (let j of jumps) {
            if (j.equipment === rig){
               count = count + 1;
            }
         }
      }
      if (count > favRigNum) {
         setFavRigNum(count);
         setFavRig(rig)
      }
      return count
   }

   function getPlaneJumpCount (plane) {
      let count = 0;
      if (Array.isArray(jumps)){
         for (let j of jumps) {
            if (j.aircraft === plane){
               count = count + 1;
            }
         }
      }
      if (count > favPlaneNum) {
         setFavPlaneNum(count);
         setFavPlane(plane)
      }
      return count
   }

   function getDZJumpCount (dz) {
      let count = 0;
      if (Array.isArray(jumps)){
         for (let j of jumps) {
            if (j.dz === dz){
               count = count + 1;
            }
         }
      }
      if (count > favDZNum) {
         setFavDZNum(count);
         setFavDZ(dz)
      }
      return count
   }



   function getThisYearsJumps(year) {
      let num = 0;
      for (let j of jumps) {
         if (parseInt(j.jump_date.slice(0,4), 10) === year) {
            num = num + 1
         }
      }

      return num
   }

   function getThisYearsFFT(year) {
      let totalJumpT = 0;
      let min = 0;
      let sec = 0;
      for (let j of jumps) {
         if (parseInt(j.jump_date.slice(0,4), 10) === year) {
            totalJumpT = totalJumpT + j.t
         }
         
      }
      sec = Math.floor((totalJumpT % 3600) % 60)
      min = Math.floor((totalJumpT % 3600) / 60);
      totalJumpT = Math.floor(totalJumpT / 3600);
      
      return `${totalJumpT}:${min}:${sec}`      
   }

   function getThisYearsAlt(year) {
      let totalAlt = 0;
      let ft = 0;
      for (let j of jumps) {
         if (parseInt(j.jump_date.slice(0,4), 10) === year) {
            totalAlt = totalAlt + j.alt
         }
      }
      ft = Math.floor(totalAlt % 5280);
      totalAlt = Math.floor(totalAlt / 5280) 
         
      

      return `${totalAlt} mi : ${ft} ft`
   }

   function getStatsByYear () {
      let SBY = <p style={headerSubStyle}>loading..</p>;
      let firstJumpYear;
      let thisYear = new Date().getFullYear();
      let jumpYears = [thisYear];
      
      if (Array.isArray(jumps)){
         firstJumpYear = parseInt(getFirstJump().slice(0,4), 10)
         const yearsJumped = thisYear - firstJumpYear
         
         if (yearsJumped > 0) {
            jumpYears = [];
            for (let i = 0; i < yearsJumped + 1; i++) {
               jumpYears.push(thisYear - i)
            }
         }
         SBY = jumpYears.map((year, index) => {
            return(<div style={contentSection} key={index}>

               <div style={sectionBar}>
                  <p style={rlStyle}>{year}</p>
               </div>

               <div style={sectionBar}>

                  <p style={textStyle}>Total Jumps in {year}:<br /><span style={textStyleProps}>{getThisYearsJumps(year)}</span></p>

                  <p style={textStyle}>Total Freefall in {year}:<br /><span style={textStyleProps}>{getThisYearsFFT(year)}</span></p>

                  <p style={textStyle}>Total Descent in {year}:<br /><span style={textStyleProps}>{getThisYearsAlt(year)}</span></p>

               </div>

            </div>)
         })

      }

      return SBY
   }


   function getJTT () {
      let JTT = 'loading...';
      if (Array.isArray(tags)) {
         const counts = {}
         for (let t of tags) {
            if (t.cat !== 'JTT') continue;
            if (!counts[t.name]) {
               counts[t.name] = {name: t.name, count: 0}
            }
            counts[t.name].count += 1;

         }
         JTT = Object.values(counts)
      }
      console.log('JTT tags', JTT)

      return (
         JTT.map((tag, idx) => {
            return (
               <div key={idx} style={listDiv}>
                  <p style={rlStyle}>{tag.name}</p>
                  <p style={textStyle}>number of {`'${tag.name}'s`}<br /><span style={textStyleProps}>{tag.count}</span></p>
               </div>
            )
         })
      )
      
   }

   function getOC () {
      let OC = 'loading...';
      if (Array.isArray(tags)) {
         const counts = {}
         for (let t of tags) {
            if (t.cat !== 'OC') continue;
            if (!counts[t.name]) {
               counts[t.name] = {name: t.name, count: 0}
            }
            counts[t.name].count += 1;

         }
         OC = Object.values(counts)
      }
      console.log('OC tags', OC)

      return (
         OC.map((tag, idx) => {
            return (
               <div key={idx} style={listDiv}>
                  <p style={rlStyle}>{tag.name}</p>
                  <p style={textStyle}>number of {`'${tag.name}'s`}<br /><span style={textStyleProps}>{tag.count}</span></p>
               </div>
            )
         })
      )
      
   } 
   
   function getLSC () {
      let LSC = 'loading...';
      if (Array.isArray(tags)) {
         const counts = {}
         for (let t of tags) {
            if (t.cat !== 'LSC') continue;
            if (!counts[t.name]) {
               counts[t.name] = {name: t.name, count: 0}
            }
            counts[t.name].count += 1;

         }
         LSC = Object.values(counts)
      }
      console.log('LSC tags', LSC)

      return (
         LSC.map((tag, idx) => {
            return (
               <div key={idx} style={listDiv}>
                  <p style={rlStyle}>{tag.name}</p>
                  <p style={textStyle}>number of {`'${tag.name}'s`}<br /><span style={textStyleProps}>{tag.count}</span></p>
               </div>
            )
         })
      )
      
   }

   function getGROUP () {
      let GROUP = 'loading...';
      if (Array.isArray(tags)) {
         const counts = {}
         for (let t of tags) {
            if (t.cat !== 'GROUP') continue;
            if (!counts[t.name]) {
               counts[t.name] = {name: t.name, count: 0}
            }
            counts[t.name].count += 1;

         }
         GROUP = Object.values(counts)
      }
      console.log('GROUP tags', GROUP)

      return (
         GROUP.map((tag, idx) => {
            return (
               <div key={idx} style={listDiv}>
                  <p style={rlStyle}>{tag.name}</p>
                  <p style={textStyle}>number of {`'${tag.name}'s`}<br /><span style={textStyleProps}>{tag.count}</span></p>
               </div>
            )
         })
      )
      
   }

   function getWTHR () {
      let WTHR = 'loading...';
      if (Array.isArray(tags)) {
         const counts = {}
         for (let t of tags) {
            if (t.cat !== 'WTHR') continue;
            if (!counts[t.name]) {
               counts[t.name] = {name: t.name, count: 0}
            }
            counts[t.name].count += 1;

         }
         WTHR = Object.values(counts)
      }
      console.log('WTHR tags', WTHR)

      return (
         WTHR.map((tag, idx) => {
            return (
               <div key={idx} style={listDiv}>
                  <p style={rlStyle}>{tag.name}</p>
                  <p style={textStyle}>number of {`'${tag.name}'s`}<br /><span style={textStyleProps}>{tag.count}</span></p>
               </div>
            )
         })
      )
      
   }

   function getEMR () {
      let EMR = 'loading...';
      if (Array.isArray(tags)) {
         const counts = {}
         for (let t of tags) {
            if (t.cat !== 'EMR') continue;
            if (!counts[t.name]) {
               counts[t.name] = {name: t.name, count: 0}
            }
            counts[t.name].count += 1;

         }
         EMR = Object.values(counts)
      }
      console.log('EMR tags', EMR)

      return (
         EMR.map((tag, idx) => {
            return (
               <div key={idx} style={listDiv}>
                  <p style={rlStyle}>{tag.name}</p>
                  <p style={textStyle}>number of {`'${tag.name}'s`}<br /><span style={textStyleProps}>{tag.count}</span></p>
               </div>
            )
         })
      )
      
   }

   function getMAL () {
      let MAL = 'loading...';
      if (Array.isArray(tags)) {
         const counts = {}
         for (let t of tags) {
            if (t.cat !== 'MAL') continue;
            if (!counts[t.name]) {
               counts[t.name] = {name: t.name, count: 0}
            }
            counts[t.name].count += 1;

         }
         MAL = Object.values(counts)
      }
      console.log('MAL tags', MAL)

      return (
         MAL.map((tag, idx) => {
            return (
               <div key={idx} style={listDiv}>
                  <p style={rlStyle}>{tag.name}</p>
                  <p style={textStyle}>number of {`'${tag.name}'s`}<br /><span style={textStyleProps}>{tag.count}</span></p>
               </div>
            )
         })
      )
      
   }

   function getREQ () {
      let REQ = 'loading...';
      if (Array.isArray(tags)) {
         const counts = {}
         for (let t of tags) {
            if (t.cat !== 'REQ') continue;
            if (!counts[t.name]) {
               counts[t.name] = {name: t.name, count: 0}
            }
            counts[t.name].count += 1;

         }
         REQ = Object.values(counts)
      }
      console.log('REQ tags', REQ)

      return (
         REQ.map((tag, idx) => {
            return (
               <div key={idx} style={listDiv}>
                  <p style={rlStyle}>{tag.name}</p>
                  <p style={textStyle}>number of {`'${tag.name}'s`}<br /><span style={textStyleProps}>{tag.count}</span></p>
               </div>
            )
         })
      )
      
   }

   // rendered lists

   const rigList = Array.isArray(rigs)
      ? rigs.map((rig, idx) => (
          <div key={idx} style={listDiv}>
            <p style={rlStyle}>{rig}</p>
            <p style={textStyle}>Jumps: <span style={textStyleProps}>{getRigJumpCount(rig)}</span></p>            
          </div>
        ))
      : <p style={rlStyle}>none</p>;

   const planeList = Array.isArray(planes)
      ? planes.map((plane, idx) => (
          <div key={idx} style={listDiv}>
            <p style={rlStyle}>{plane}</p>
            <p style={textStyle}>Jumps: <span style={textStyleProps}>{getPlaneJumpCount(plane)}</span></p>
          </div>
        ))
      : <p style={rlStyle}>none</p>;

      const dzList = Array.isArray(DZs)
      ? DZs.map((dz, idx) => (
          <div key={idx} style={listDiv}>
            <p style={rlStyle}>{dz}</p>
            <p style={textStyle}>Jumps: <span style={textStyleProps}>{getDZJumpCount(dz)}</span></p>
          </div>
        ))
      : <p style={rlStyle}>none</p>;


   //api

  const getAllTags = async () => {
    try {
      const response = await fetch(`${svr}/getalltags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID}),
      });
      const returnedData = await response.json();
      if(response.ok){
        let foundTags = [];
        for (let tag of returnedData.results) {
          foundTags.push({name : tag.name, cat : tag.cat});
        }
        setTags([...foundTags]);
      } else{
        console.error('no tags imported', response);
        setTags([])
      }
    } catch (err) {
      console.error('client failed getting tags', err);
    }
  };

  //useEffect

  useEffect(() => {
   setRigs(props.rigs.map(rig => rig.name));  
   setDZs(props.dzs.map(dz => dz.name));  
   setPlanes(props.planes.map(plane => plane.name));  
   getAllTags();
  }, [])

   return(
      <div style={shell}>
         <br />

         <div style={section}>
            <img
               style={{
                 aspectRatio: '5 /1',
                 width: '60%',
                 paddingTop: '2em',
                 margin: 'auto'
               }}
               src="/CloudLogBannerWhite.svg"
            />
         </div>
         
         <p style={headerStyle}>Statistics</p>

         {!tagsPage && <div style={contentSection}>

            <div style={sectionBar}>

               <p style={textStyle}>Total Jumps:<br /> <span style={textStyleProps}>{jump_num}</span></p>

               <p style={textStyle}>Total Freefall Time:<br /> <span style={textStyleProps}>{getTotalFFT()}</span></p>

               <p style={textStyle}>Total Descent Altitude:<br /> <span style={textStyleProps}>{getTotalAlt()}</span></p>

            </div>

            <div style={sectionBar}>
               <p style={textStyle}>First Jump:<br /> <span style={textStyleProps}>{getFirstJump()}</span></p>
               <p style={textStyle}>Last Jump:<br /> <span style={textStyleProps}>{getLastJump()}</span></p>
            </div>

            <div style={sectionBar}>

               <p style={textStyle}>Favorite DZ:<br /> <span style={rlStyle}>{favDZ}</span><br /><span style={textStyleProps}>{favDZNum} Jumps</span></p>
               <p style={textStyle}>Favorite Aircraft:<br /> <span style={rlStyle}>{favPlane}</span><br /><span style={textStyleProps}>{favPlaneNum} Jumps</span></p>
               <p style={textStyle}>Favorite Rig:<br /> <span style={rlStyle}>{favRig}</span><br /><span style={textStyleProps}>{favRigNum} Jumps</span></p>

            </div>

            <div style={sectionBar}>
               <button style={dzPage ? dd1Button : ddButton} onClick={handledzPage}>Dropzones</button>
               <button style={planePage ? dd1Button : ddButton} onClick={handlePlanePage}>Aircraft</button>
               <button style={rigPage ? dd1Button : ddButton} onClick={handleRigPage}>Rigs</button>
            </div>

            {(planePage || dzPage || rigPage) && <div style={sectionList}>
               {rigPage && rigList}
               {planePage && planeList}
               {dzPage && dzList}
               </div>}

            <div style={sectionBar}>
               <button style={npButton} onClick={handleTagsPage}>Tags</button>
            </div>
            
            
            
         </div>}
         
         <p style={headerSubStyle}>Liscense Progress</p>

         <div style={contentSection}>

            <div style={sectionBarPB}>

               <p style={textStyle2}>A Liscence Progess</p>

               <div style={pgsBarBG}>
                  <div style={progressALSC}><p style={textStyle1}>{getLSCptg('a')}</p></div>
               </div>
            
            </div>

            <div style={sectionBarPB}>

               <p style={textStyle2}>B Liscence Progess</p>

               <div style={pgsBarBG}>
                  <div style={progressBLSC}><p style={textStyle1}>{getLSCptg('b')}</p></div>
               </div>
            
            </div>

            <div style={sectionBarPB}>

               <p style={textStyle2}>C Liscence Progess</p>

               <div style={pgsBarBG}>
                  <div style={progressCLSC}><p style={textStyle1}>{getLSCptg('c')}</p></div>
               </div>
            
            </div>

            <div style={sectionBarPB}>

               <p style={textStyle2}>D Liscence Progess</p>

               <div style={pgsBarBG}>
                  <div style={progressDLSC}><p style={textStyle1}>{getLSCptg('d')}</p></div>
               </div>
            
            </div>
            
         </div>

         {!tagsPage &&
         <div>
            <p style={headerSubStyle}>stats by year</p>
            {getStatsByYear()}
            <p style={rlStyle}>lists of jumps by year can be  displayed by entering "YYYY" into the search field (ex: 2025)</p>
         </div>
         }




         {tagsPage && <div style={contentSection}>
            <div style={sectionBack}>
               <button style={nestedButton} onClick={handleTagsPage}>Back</button>
            </div>
            <div style={sectionBar}>
               <p style={rlStyle}>Select Tag Type</p>
            </div>
            <div style={sectionBar}>
               <button style={!JTTField ? ttButton : ttButton1} onClick={handleJTTPage}>Jump Types</button>
               <button style={!OCField ? ttButton : ttButton1} onClick={handleOCPage}>Openings</button>
               <button style={!LSCField ? ttButton : ttButton1} onClick={handleLSCPage}>Liscense and Rating</button>
               <button style={!GROUPField ? ttButton : ttButton1} onClick={handleGROUPPage}>group-size</button>
               <button style={!WTHRField ? ttButton : ttButton1} onClick={handleWTHRPage}>Canopy</button>
               <button style={!EMRField ? ttButton : ttButton1} onClick={handleEMRPage}>Emergency</button>
               <button style={!MALField ? ttButton : ttButton1} onClick={handleMALPage}>Malfunction</button>
               <button style={!REQField ? ttButton : ttButton1} onClick={handleREQPage}>Pre-Requisite</button>
            </div>

            <div style={sectionBar}>
               {
                  <>
                     {JTTField && <p style={headerSubStyle}>Jump Types</p>}
                     {OCField && <p style={headerSubStyle}>Openings</p>}
                     {LSCField && <p style={headerSubStyle}>Liscenses and Ratings</p>}
                     {GROUPField && <p style={headerSubStyle}>Groups</p>}
                     {WTHRField && <p style={headerSubStyle}>Canopy and Weather</p>}
                     {EMRField && <p style={headerSubStyle}>Emergencies</p>}
                     {MALField && <p style={headerSubStyle}>Malfunctions</p>}
                     {REQField && <p style={headerSubStyle}>Prerequisites</p>}
                  </>
               }
            </div>

            <div style={sectionBar}>
               {JTTField && getJTT()}
               {OCField && getOC()}
               {LSCField && getLSC()}
               {GROUPField && getGROUP()}
               {WTHRField && getWTHR()}
               {EMRField && getEMR()}
               {MALField && getMAL()}
               {REQField && getREQ()}

            </div>
         </div>}
      </div>
   )

}

export default StatsPage