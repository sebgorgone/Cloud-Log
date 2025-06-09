import {useState} from 'react';
import {getPallette} from "../logInputWidget";
import '../style/loginScreen.css';
import WelcomeForm from '../components/WelcomeForm';
import NavForm from '../components/NavForm';

function WelcomePage(props) {

   const {user, jumps } = props

   console.log(user, jumps)

   const pallette = getPallette();

   const shell = {
      marginTop: "5em",
      marginLeft: "5em"
   }

   const logo = {
      display: "flex",
      justifyContent: "center",
   }

   const welcome = {
      margin: "0",
      fontSize: "1.7em",
      fontFamily: "L1",
      color: pallette[4]
   }

   return(
      <div style={shell}>  
         <br /> 

         <div style={logo}>
            <img style={{width: "max(40%, 250px)"}} src="CloudLogBannerBlack.svg"/>
         </div>

         <h3 style={welcome}>Welcome {props.user.name}</h3>

         {props.jumps === 'loading' ? <p>loading user data</p> : props.jumps.length === 0 ?<WelcomeForm /> : <NavForm />}

         
      </div>
   )

}

export default WelcomePage

