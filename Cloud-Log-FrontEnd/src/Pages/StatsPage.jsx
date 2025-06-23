import {useState, useEffect} from 'react';
import {getPallette} from "../logInputWidget";
import '../style/loginScreen.css';

//jumps={userJumpHistory} user={user} jump_num={userJumpCount}

function StatsPage(props) {

   //environment
   

   const pallette = getPallette()

   // const jumps = props.jumps

   const jumps= [{ 
      jump_num: 4, 
      jump_date: "2025-06-17", 
      dz: "Connecticut Parachutists", 
      aircraft: "Cessna 206", 
      equipment: "Navigator 220", 
      alt: 4, 
      t: 7,
      notes: "hello retard" ,
   },
   { 
      jump_num: 3, 
      jump_date: "2025-04-12", 
      dz: "Connecticut Parachutists", 
      aircraft: "Caravan", 
      equipment: "Vector 3 Storm 190", 
      alt: 5000, 
      t: 30,
      notes: "hello retard" ,
   },
   { 
      jump_num: 2, 
      jump_date: "2025-02-25", 
      dz: "Jumptown", 
      aircraft: "Cessna 182", 
      equipment: "Tandem Harness!!", 
      alt: 10293, 
      t: 56,
      notes: "hello retard" ,
   },
      { 
      jump_num: 1, 
      jump_date: "2025-01-01", 
      dz: "Connecticut Parachutists", 
      aircraft: "Cessna 206", 
      equipment: "Tandem Harness!!", 
      alt: 4000, 
      t: 70,
      notes: "hello retard" ,
   }]

   // const user = props.user

   const user = { ID : 1 }

   // const jump_num = { props.jump_num}

   const jump_num = 4 

   //state

   const [rigs, setRigs] = useState('No saved rigs yet');

   const [planes, setPlanes] = useState('No saved planes yet');

   const [DZs, setDZs] = useState('No saved dropzones yet');

   const [tags, setTags] = useState([])

   const [dzPage, setDzPage] = useState(false);

   const [rigPage, setRigPage] = useState(false);

   const [planePage, setPlanePage] = useState(false);

   const [tagsPage, setTagsPage] = useState(false)


console.log('in the Stats page', jumps, rigs);

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

      setTagsPage(!tagsPage);
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
      marginTop: "1em",
      marginBottom: "1em",
      fontFamily: "L1",
      fontSize: ".7em",
      width: "7em",
      borderRadius: ".9em",
      paddingBottom: ".2em",
      background: pallette[2],
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
         console.log('total jump seconds: ', totalJumpT);
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
         console.log('total altitude (ft): ', totalAlt)
         ft = Math.floor(totalAlt % 5280);
         totalAlt = Math.floor(totalAlt / 5280) 
         
      }

      return `${totalAlt} mi : ${ft} ft`
   }

   function getFirstJump() {
      let firstJumpDate = 'loading';
      if (Array.isArray(jumps)) {
         firstJumpDate = jumps[jumps.length - 1].jump_date.slice(0, 10)
      }

      return firstJumpDate
   }

   function getLastJump() {
      let LastJumpDate = 'loading';
      if (Array.isArray(jumps)) {
         LastJumpDate = jumps[0].jump_date.slice(0, 10)
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
      return count
   }


   // rendered lists

   const rigList = Array.isArray(rigs)
      ? rigs.map((rig, idx) => (
          <div key={idx} style={listDiv}>
            <p style={rlStyle}>{rig}</p>
            <p style={textStyle}>Jumps: <span style={textStyleProps}>{getRigJumpCount(rig)}</span></p>            
          </div>
        ))
      : null;

   const planeList = Array.isArray(planes)
      ? planes.map((plane, idx) => (
          <div key={idx} style={listDiv}>
            <p style={rlStyle}>{plane}</p>
            <p style={textStyle}>Jumps: <span style={textStyleProps}>{getPlaneJumpCount(plane)}</span></p>
          </div>
        ))
      : null;

      const dzList = Array.isArray(DZs)
      ? DZs.map((dz, idx) => (
          <div key={idx} style={listDiv}>
            <p style={rlStyle}>{dz}</p>
            <p style={textStyle}>Jumps: <span style={textStyleProps}>{getDZJumpCount(dz)}</span></p>
          </div>
        ))
      : null;


   //api

   const getDZs = async () => {
    try {
      const response = await fetch('http://localhost:5009/getdzs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID}),
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
        setDZs('No saved dropzones yet')
      }
    } catch (err) {
      console.error('client failed getting DZs', err);
    }
  };

  const getPlanes = async () => {
    try {
      const response = await fetch('http://localhost:5009/getplanes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID}),
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
        setPlanes('No saved planes yet')
        props.rst();
      }
    } catch (err) {
      console.error('client failed getting planes', err);
      
    }
  };

  const getRigs = async () => {
    try {
      const response = await fetch('http://localhost:5009/getrigs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID}),
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
        setRigs('No saved rigs yet')
      }
    } catch (err) {
      console.error('client failed getting rigs', err);
    }
  };

  const getAllTags = async () => {
    try {
      const response = await fetch('http://localhost:5009/getalltags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID}),
      });
      const returnedData = await response.json();
      if(response.ok){
        let foundTags = [];
        for (let tag of returnedData.results) {
          foundRigs.push({name : tag.name, cat : tag.cat});
        }
        setTags([...foundRigs]);
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
   getDZs();
   getPlanes();
   getRigs();
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
               <button style={npButton} onClick={handleTagsPage}>jump types and tags</button>
            </div>
            
            
            
         </div>}

         {/* {tagsPage &&<div style={contentSection}>
            <div style={sectionBack}>
               <button style={nestedButton} onClick={handleTagsPage}>Back</button>
            </div>
            <div style={sectionBar}>
               <p style={rlStyle}>select tag type</p>
            </div>
            <div style={sectionBar}>
               <button style={ttButton}>Jump Types</button>
               <button style={ttButton}>Openings</button>
               <button style={ttButton}>Liscense + Rating</button>
               <button style={ttButton}>group-size</button>
               <button style={ttButton}>Canopy</button>
               <button style={ttButton}>Emergency</button>
               <button style={ttButton}>Malfunction</button>
               <button style={ttButton}>Pre-Requisites</button>
            </div>
         </div>} */}
         {tagsPage &&<div style={contentSection}>
            <div style={sectionBack}>
               <button style={nestedButton} onClick={handleTagsPage}>Back</button>
            </div>
            <div style={sectionBar}>
               <p style={rlStyle}>This page is under construction...</p>
            </div>
         </div>}


      </div>
   )

}

export default StatsPage