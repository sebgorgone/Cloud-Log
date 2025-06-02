import { useState, useEffect } from 'react'
import {getUser} from './contexts/authContext'
import {getPallette} from "./logInputWidget"
import LogInputWidget from './logInputWidget'

function HomePage() {

   const pallette = getPallette()

   const user = getUser()

   // console.log('user: ', user, 'Pallette: ', pallette)

   //states
   const [showAddWidget, setShowAddWidget]= useState(false);

   //handlers
   function toggleWidgetDropdown (e) {
      e.preventDefault()
      setShowAddWidget(!showAddWidget)
   }
   //inline styles
   const homePageShell = {
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
      background: pallette[4]
   }
   const nameStyle= {
      color: pallette[0],
      fontFamily: "L1",
      fontWeight: "bold",
      fontSize: "1.5em",
      margin: "0",
      padding: "0",
   }
   const jumpNumStyle= {
      color: pallette[0],
      fontFamily: "L1",
      fontSize: ".7em",
      margin: "0",
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
      width: "2.5em",
      zIndex: "2",
      padding: "2vh",
      display: "flex",
      flexDirection: "column",
      background: pallette[4]
   }

   const widgetMenu = {
      background: pallette[1],
      border: "solid .2em",
      borderColor: pallette[3],
      marginLeft: "2.9em",
      width: "94%",
      marginTop: "3.1em",
      padding: "1em",
      paddingTop: "1.6em",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      overflowX: "hidden"
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
   const mainPageArea = {margin: "0", marginLeft: "5em",}
   return(
      <div style={homePageShell}>


         <div style={headerStyle}>

            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", padding: "2vw"}}>
               <i>logo</i>
            </div>

            <div >
               <p style={nameStyle}>Hello {user.name.length > 20 ? user.name.slice(0, 20) : user.name }!</p>
               <p style={jumpNumStyle}>{'{jump num}'} Jumps</p>
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
               <p>hello</p>
               <p>hello</p>
               <p>hello</p>
               <p>hello</p>
               <p>hello</p>
            </div>
            
         </div>


         <div style={widgetMenu}>
            <div style={!showAddWidget ? {display: "block", width: "80%", marginLeft: "2em"} : {display: "none"}}>
               <LogInputWidget />
            </div>
            <br />
            <div>
               <button style={newJumpButton} onClick={toggleWidgetDropdown}>Add New Jumps</button>
            </div>
            
         </div>

         <div style={mainPageArea}>
            <p> hellp</p>
         </div>


      </div>
   )
}

export default HomePage;