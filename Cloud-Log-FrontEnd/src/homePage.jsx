import { useState, useEffect } from 'react'
import {getUser} from './contexts/authContext'
import {getPallette} from "./logInputWidget"
import LogInputWidget from './logInputWidget'
import FullJumpLedge from './components/fullJumpHistory.jsx'

function HomePage() {



   //environment variables


   const pallette = getPallette()

   const user = getUser()

   // console.log('user: ', user, 'Pallette: ', pallette)

   //states
   const [showAddWidget, setShowAddWidget]= useState(false);

    const [router, setRouter] = useState({
      fullList: true,
      searchedList: false,
      download: false,
      stats: false,
      settings: false,
    })

   //handlers
   function toggleWidgetDropdown (e) {
      e.preventDefault()
      setShowAddWidget(!showAddWidget)
   }

      //getjumphistory post

   const [userJumpHistory, setUserJumpHistory] = useState();
   

   const getJumpHist = async () => { 
      try {
         const response = await fetch('http://localhost:5009/userjumphistory', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({user_id: user.ID}),
         });
         const data = await response.json();
         if(data.ok){
            let jumpHist = [];
            for (let jump of data.results) {
               jumpHist.push(jump);
            }
            setUserJumpHistory(jumpHist);
            
            
         }
         else {
            console.error('no Jumps imported', data)
         }
      } catch (err) {
         console.error('client failed to load user jumps')
      }
   }


   

      




   //inline styles
   const homePageShell = {
      overflowX: "hidden"
   }
   const headerStyle ={
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "3em",
      zIndex: "3",
      padding: "2vh",
      display: "flex",
      background: pallette[4],
      borderBottom: "solid .25em",
      borderColor: pallette[3]
   }
   const nameStyle= {
      color: pallette[0],
      fontFamily: "L1",
      fontWeight: "bold",
      fontSize: "1.5em",
      margin: "0",
      marginLeft: "25px",
      padding: "0",
   }
   const jumpNumStyle= {
      color: pallette[0],
      fontFamily: "L1",
      fontSize: ".7em",
      margin: "0",
      marginLeft: "25px",
      padding: "0",
   }
   const filterButtonStyle= {
      maxHeight: "30px",
      color: pallette[0],
      backgroundColor: pallette[3],
      fontFamily: "L1",
      fontSize: "1.2em",
      padding: "1em",
      border: "none",
      borderRadius: "2.7em",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"  
   }
   const filterInputStyle= {
      maxHeight: "3em",
      background: pallette[0],
      fontFamily: "L1",
      minWidth: "50%"
   } 
   const sidebarStyle ={
      position: "fixed",
      height: "100%",
      top: "0",
      width: "3.5em",
      zIndex: "3",
      padding: "2vh",
      display: "flex",
      flexDirection: "column",
      background: pallette[4],
      borderRight: "solid .25em",
      borderColor: pallette[3]
   }

   const widgetMenu = {
      background: pallette[1],
      borderBottom: "solid .2em",
      borderColor: pallette[3],
      marginLeft: "2em",
      width: "100%",
      marginTop: "3.1em",
      padding: "1em",
      paddingTop: "1.6em",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      overflowX: "hidden",
   }
   const newJumpButton= {
         margin: ".7em",
         display: "inline-block",
         alignItems: "center",
         justifyContent: "center",
         color: pallette[0],
         background: pallette[3],
         border: "none"
   }
   const mainPageArea = {
      margin: "0", 
      overflowX: "hidden",
      background: pallette[2]
   }


   //useEffects

   useEffect(() => {router.fullList && getJumpHist()}, [showAddWidget])
   return(
      <div style={homePageShell}>


         <div style={headerStyle}>

            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", padding: "2vw"}}>
               <i>logo</i>
            </div>

            <div >
               <p style={nameStyle}>Hello {user.name.length > 20 ? user.name.slice(0, 20) : user.name }!</p>
               <p style={jumpNumStyle}>{Array.isArray(userJumpHistory) ? userJumpHistory.length : 'Loading...'} Jumps</p>
            </div>

            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="🔎Search"
                style={filterInputStyle}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginRight: "5vw"}}>
              <button style={filterButtonStyle}>Filters</button>
            </div>

            
         </div>

         <div style={sidebarStyle}>

            <div style={{marginTop: "5.2em"}}>


               <button 
                  title='Full Logbook Ledgar'
                  style={{borderRadius: "50%", border: "solid .2em", borderColor: pallette[3], marginTop: "2vh"}}>
                     <img style={{width: '1.8em', height: '1.8em', padding: ".3em"}} src="/list-svgrepo-com.svg" />
               </button>
               
               
               <button 
                  title='Download Logbook Data'
                  style={{borderRadius: "50%", border: "solid .2em", borderColor: pallette[3], marginTop: "2vh"}}>
                     <img style={{width: '2em', height: '2em', padding: ".2em"}} src="/download-file-1-svgrepo-com(1).svg" />
               </button>


               <button 
                  title='Statistics'
                  style={{borderRadius: "50%", border: "solid .2em", borderColor: pallette[3], marginTop: "2vh"}}>
                     <img style={{width: '2em', height: '2em', padding: ".3em"}} src="/stats-svgrepo-com(2).svg" />
               </button>


               <button 
                  title='Settings'
                  style={{borderRadius: "50%", border: "solid .2em", borderColor: pallette[3], marginTop: "2vh"}}>
                     <img style={{width: '1.8em', height: '1.8em', padding: ".4em"}} src="/settings-gear-part-2-svgrepo-com.svg" />
               </button>


            </div>
            
         </div>


         <div style={widgetMenu}>
            <div style={showAddWidget ? {display: "block", width: "80%", marginLeft: "2em"} : {display: "none"}}>
               <LogInputWidget numOfJumps={Array.isArray(userJumpHistory) ? userJumpHistory.length : null}/>
            </div>
            <br />
            <div>
               <button 
                  title={!showAddWidget ? "Add New Jumps" : "Hide 'Add Jump' menu"}
                  style={newJumpButton} onClick={toggleWidgetDropdown}>
                     {!showAddWidget ? 'Add New Jumps' : 'Hide Add Menu'}
               </button>
            </div>
            
         </div>

         <div style={mainPageArea}>
            {router.fullList ? <FullJumpLedge jumps={userJumpHistory}/> : null}
         </div>


      </div>
   )
}

export default HomePage;