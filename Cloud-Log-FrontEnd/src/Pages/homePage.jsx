import { useState, useEffect } from 'react'
import {getUser, useAuth} from '../contexts/authContext.jsx'
import {getPallette} from "../logInputWidget.jsx"
import FullJumpLedge from './fullJumpHistory.jsx'
import WelcomePage from './WelcomePage.jsx'
import StatsPage from './StatsPage.jsx'
import DownloadPage from './DownloadPage.jsx'
import SettingsPage from './SettingsPage.jsx'
import SearchedList from './SearchedList.jsx'


function HomePage(props) {

   //environment variables

   const { logout } = useAuth();

   const pallette = getPallette()

   const user = getUser()


   //states

    const [router, setRouter] = useState({
      welcome: true,
      fullList: false,
      searchedList: false,
      download: false,
      stats: false,
      settings: false,
    })

   const [wcField, setWcField] = useState();

   const [wildCard, setWildCard] = useState();

   const [flag, setFlag]= useState(false);

   //getjumphistory post

   const [userJumpHistory, setUserJumpHistory] = useState();

   const [userJumpCount, setUserJumpCount] = useState();
   

   const getJumpHist = async () => { 
      setUserJumpHistory(null);
      // console.log('getting user jump history')
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
            // console.log('set user jump history')
               
         }
         else {
            console.error('jumps not found', data)
         }
      } catch (err) {
         console.error('client failed to load user jumps')
      }
   }
   

   //handlers

   function handleNavToLedg (e) {
      e.preventDefault();
      setRouter({
      welcome: false,
      fullList: true,
      searchedList: false,
      download: false,
      stats: false,
      settings: false,
    })
   }
   function callLedg () {
      setRouter({
      welcome: false,
      fullList: true,
      searchedList: false,
      download: false,
      stats: false,
      settings: false,
    })
   }
   function handleNavToStats (e) {
      e.preventDefault();
      setRouter({
      welcome: false,
      fullList: false,
      searchedList: false,
      download: false,
      stats: true,
      settings: false,
    })
   }
   function callStats () {
      setRouter({
      welcome: false,
      fullList: false,
      searchedList: false,
      download: false,
      stats: true,
      settings: false,
    })
   }
   function handleNavToDownload (e) {
      e.preventDefault();
      setRouter({
      welcome: false,
      fullList: false,
      searchedList: false,
      download: true,
      stats: false,
      settings: false,
    })
   }
   function handleNavToSettings (e) {
      e.preventDefault();
      setRouter({
      welcome: false,
      fullList: false,
      searchedList: false,
      download: false,
      stats: false,
      settings: true,
    });
   }
   function handleLogout (e) {
      e.preventDefault();
      logout();
    }
    function handleSearch(e) {

      setUserJumpHistory(null)
      e.preventDefault();
      setWildCard(wcField);
      setRouter({
         welcome: false,
         fullList: false,
         searchedList: true,
         download: false,
         stats: false,
         settings: false,
      })

      setFlag(prev => !prev);
   
    }
    function updateWildCardField (e) {
      setWcField(e.target.value)
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
      padding: "1em",
      display: "flex",
      background: pallette[4],
      borderBottom: "solid .25em",
      borderColor: pallette[3],
   }
   const nameStyle= {
      color: pallette[0],
      fontFamily: "L1",
      fontWeight: "bold",
      fontSize: "min(3vw, 25px)",
      margin: "0",
      marginLeft: "65px",
      padding: "0",
   }
   const jumpNumStyle= {
      color: pallette[0],
      fontFamily: "L1",
      fontSize: ".7em",
      margin: "0",
      marginLeft: "65px",
      padding: "0",
   }
   const filterButtonStyle= {
      maxHeight: "30px",
      color: pallette[0],
      backgroundColor: pallette[3],
      fontFamily: "L1",
      fontSize: "1.2em",
      padding: ".3.3em",
      paddingTop: ".7em",
      paddingBottom: ".8em",
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
      paddingLeft: ".7em",
      display: "flex",
      flexDirection: "column",
      background: pallette[4],
      borderRight: "solid .25em",
      borderColor: pallette[3]
   }
   const mainPageArea = {
      margin: "0", 
      height: "100%",
      overflowX: "hidden",
      background: pallette[2]
   }
   const logOutButton = {
      position: "fixed",
      fontFamily: "L1",
      color: pallette[0],
      zIndex: "4",
      bottom: "1.75em",
      left: ".75em",
      background: "none",
      border: "none",
      boxShadow: "none",
   }


   //useEffects


   useEffect(() => {
      !router.searchedList && getJumpHist();
   }, [router]);

   useEffect(() => {
      userJumpHistory && setUserJumpCount(userJumpHistory.length)
   }, [userJumpHistory])


   return(
      <div style={homePageShell}>


         <div style={headerStyle}>

            <div >
               <p style={nameStyle}>{user.name.length > 20 ? user.name.slice(0, 20) : user.name }</p>
               <p style={jumpNumStyle}>{userJumpCount ? userJumpCount : userJumpCount !== 0 ? 'Loading...' : userJumpCount} Jumps</p>
            </div>

            <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input
                 value={wcField}
                 onChange={updateWildCardField}
                 type="text"
                 placeholder="🔎Search"
                 style={filterInputStyle}
              />
            </form>

            <div style={{ display: 'flex', alignItems: 'center', marginRight: "5vw"}}>
              <button style={filterButtonStyle}>Filters</button>
            </div>

            
         </div>

         <button style={logOutButton} onClick={handleLogout}>log out</button>

         <div style={sidebarStyle}>

            <img style={{width: '3em', height: '3em', paddingTop: ".5em"}} src="/cloudLogBoxLogo-white.svg" />

            <div style={{marginTop: "5.2em"}}>


               <button 
                  title='Full Logbook Ledgar'
                  style={{borderRadius: "50%", border: "solid .2em", borderColor: pallette[2], marginTop: "2vh", background: pallette[0]}}
                  onClick={handleNavToLedg}
               >
                     <img style={{width: '1.8em', height: '1.8em', padding: ".3em"}} src="/list-svgrepo-com.svg" />
               </button>


               <button 
                  title='Statistics'
                  style={{borderRadius: "50%", border: "solid .2em", borderColor: pallette[2], marginTop: "3vh", background: pallette[0]}}
                  onClick={handleNavToStats}
               >
                     <img style={{width: '2em', height: '2em', padding: ".3em"}} src="/stats-svgrepo-com(2).svg" />
               </button>
               
               
               <button 
                  title='Download Logbook Data'
                  style={{borderRadius: "50%", border: "solid .2em", borderColor: pallette[2], marginTop: "3vh", background: pallette[0]}}
                  onClick={handleNavToDownload}
               >
                     <img style={{width: '2em', height: '2em', padding: ".2em"}} src="/download-file-1-svgrepo-com(1).svg" />
               </button>


               <button 
                  title='Settings'
                  style={{borderRadius: "50%", border: "solid .2em", borderColor: pallette[2], marginTop: "3vh", background: pallette[0]}}
                  onClick={handleNavToSettings}
               >
                     <img style={{width: '1.8em', height: '1.8em', padding: ".4em"}} src="/settings-gear-part-2-svgrepo-com.svg" />
               </button>


            </div>
            
         </div>


         <div style={mainPageArea}>
            {router.welcome ? <WelcomePage user={user} jumps={userJumpHistory ? userJumpHistory : 'loading'} skip={callLedg} stats={callStats} />: null}
            {router.fullList ? <FullJumpLedge rst={ () => getJumpHist()} jumps={userJumpHistory} jump_num={userJumpCount}/> : null}
            {router.download ? <DownloadPage user={user} /> : null}
            {router.stats ? <StatsPage jumps={userJumpHistory} user={user} /> : null}
            {router.settings ? <SettingsPage user={user} jump_num={userJumpCount} flag={() => console.log('helloworld')}/> : null}
            {router.searchedList ? <SearchedList user={user} wildCard={wildCard} flag={flag} jump_num={userJumpCount}/> : null}
         </div>


      </div>
   )
}

export default HomePage;