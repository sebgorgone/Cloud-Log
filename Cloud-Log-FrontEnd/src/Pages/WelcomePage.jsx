import {useState, useEffect} from 'react';
import {getPallette} from "../logInputWidget";
import '../style/loginScreen.css';
import WelcomeForm from '../components/WelcomeForm';
import NavForm from '../components/NavForm';
import LoadPage from './LoadPage';

function WelcomePage(props) {

   const svr = import.meta.env.VITE_SVR_URL;

   //env

   const {user} = props

   const logbook = props.skip;

   const statspage = props.stats;


   const pallette = getPallette();

   //state

   const [basket, setBasket] = useState(false);

   const [readMeField, setReadMeField] = useState(false);

   //handlers

   function handleBasket () {
      setBasket(true);
   }

   //api

   const checkBasket = async () => {
    try {
      const response = await fetch(`${svr}/checkbasket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
        returnedDATA.results.length !== 0 && setBasket(true);
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed to receive basket', err);}
  };

   //style

   const shell = {
      marginTop: "5em",
      marginLeft: "5em"
   }

   const logo = {
      display: "flex",
      justifyContent: "center",
   }

   const textSection = {      
      fontSize:"min(2.5vw, 89.3px)",
      fontFamily: "L1",
      color: pallette[0],
      margin: "auto",
      textAlign: "center",
   }
   //useEffct

   useEffect(() => {checkBasket()}, [basket])

   return(
      <>
         <div style={shell}>  
            <br /> 

            <div style={logo}>
               <img style={{width: "max(40%, 300px)"}} src="CloudLogBannerBlack.svg"/>
            </div>


            {/* {(props.jumps === 'loading' || props.defaults === 'loading...') ? <LoadPage /> : props.jumps.length === 0 && !basket ?<WelcomeForm user={user} skip={handleBasket} rigs={[...props.rigs]} planes={props.planes} dzs={props.dzs} defaults={{plane: props.defaults.plane, rig: props.defaults.rig, dz: props.defaults.dz}}/> : <NavForm logs={logbook} stats={statspage} />} */}
            {(props.jumps === 'loading' || props.defaults === 'loading...') ? <LoadPage /> : <NavForm />}


         </div>
         {!readMeField && <div style={{display: "flex", justifyContent: "center", flexFlow: "column", alignItems: "center", marginLeft: "5em"}}>
            <button type='button' style={{border: "none", borderRadius: "1.5em", fontFamily: "L1",padding: ".3em", color: pallette[4], margin: ".3em", background: pallette[0], width: "8em"}} onClick={() => setReadMeField(true)}>⭐️ read me</button>
         </div>} 

         {readMeField && <div style={{display: "flex", justifyContent: "center", flexFlow: "column", alignItems: "center", marginLeft: "5em"}}>

            <p style={textSection}>
               I built this app with the intention of learning more about fullstack development. Any suggestions, feeback, or bugs you may find are extremely helpful to me, as well as to this app. Cloud log is still in development, I intend to leave this hosted for as long as people are using it as a free way to log your jumps online, and eventually roll out a paid version with support for media, and flighstight / logbook data. Provided it stays economically feasbale to keep hosting this website- all of the functionality in this distribution of cloudlog will remain free and accessable by your account
            </p>

            <p style={textSection}>
               -
            </p>

            <p style={textSection}>
               While I am still building the application there may be downtimes where the page wont load or you get alerts on login with a 500 server error. I will do my absolute best to keep these downtimes to a minimum.
            </p>

            <p style={textSection}>
               -
            </p>

            <p style={textSection}>
               The account that has been provided to you will be available (as well as all of your jumps, saved rigs, defaults, etc) in the full production. Feel free to revise your credentials in the settings menu.
            </p>
            <p style={textSection}>
               -
            </p>

            <p style={textSection}>
               Thank you for trying Cloud log!
            </p>

            <button type='button' style={{border: "none", borderRadius: "1.5em", fontFamily: "L1",padding: ".3em", color: pallette[0], margin: ".3em", background: pallette[4], width: "8em"}} onClick={() => setReadMeField(false)}>close me</button>
         </div>}

      </>
   )

}

export default WelcomePage

