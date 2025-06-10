import {useState, useEffect} from 'react';
import {getPallette} from "../logInputWidget";
import '../style/loginScreen.css';
import WelcomeForm from '../components/WelcomeForm';
import NavForm from '../components/NavForm';

function WelcomePage(props) {
   //env

   const {user} = props

   const logbook = props.skip;

   const statspage = props.stats;


   const pallette = getPallette();

   //state

   const [basket, setBasket] = useState(false);

   //handlers

   function handleBasket () {
      setBasket(true)
   }

   //api

   const checkBasket = async () => {
    try {
      const response = await fetch('http://localhost:5009/checkbasket', {
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

   const welcome = {
      margin: "auto",
      fontSize:"min(7vw, 250px)",
      fontFamily: "L1",
      color: pallette[4],

   }
   //useEffct

   useEffect(() => {checkBasket()}, [])

   return(
      <div style={shell}>  
         <br /> 

         <div style={logo}>
            <img style={{width: "max(40%, 250px)"}} src="CloudLogBannerBlack.svg"/>
         </div>

         <h3 style={welcome}>Welcome {props.user.name}</h3>

         {props.jumps === 'loading' ? <p>loading user data</p> : props.jumps.length === 0 && !basket ?<WelcomeForm user={user} skip={handleBasket}/> : <NavForm logs={logbook} stats={statspage} />}

         
      </div>
   )

}

export default WelcomePage

