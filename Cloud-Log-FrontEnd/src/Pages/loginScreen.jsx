import {useState} from 'react';
import {getPallette} from "../logInputWidget";
import '../style/loginScreen.css';
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from '../contexts/authContext';
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           



function LoginScreen () {

   const svr = import.meta.env.VITE_SVR_URL;

   const domain = 'https://mycloudlog.netlify.app';

   const nav = useNavigate();
   const { login, user } = useAuth();

   const [ident, setIdent] = useState("");
   const [psky, setPsky] = useState("");
   if (user) {
      return <Navigate to="/" replace />
   }
   //pallette v
   const pallette = getPallette();

   //styles vv
   const backdrop = {
      display: "felx",
      minWidth: "100%",
      minHeight: "100%",
   }
   const loginContainer = {
      background: pallette[4],
      padding: "1vw",
      maxWidth: "28em",
      margin: "auto",
      marginTop: "5vh",
      minHeight: "20em",
      borderRadius: "1em",
      border: "solid .4em",
      borderColor: pallette[0],
   }

   const headerStyle = {
      color: pallette[0],
      fontFamily: "L1",
   }

   const inputStyle = {
      fontFamily: "L1",
      color: pallette[0],
      background: pallette[3],
      margin: "8vh auto",
      minWidth: "75%",
      display: "block",
      border: "none",

   }

   const signupPageButton = {
      color: pallette[0],
      fontFamily: "L1",
   }

   const loginButton = {
      fontFamily: "L1",
      border: "none",
      color: pallette[0],
      background: pallette[3],
      margin: "0",
      minWidth: "40%",
      display: "block",
   }

   


   //handlers vv

   const handleLoginSuccess = (data) => {
      login(data);
      nav('/');

   }


  const handleLogin = async () => {
    try {
      const response = await fetch(`${svr}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: ident, password: psky }),
      });

      const contentType = response.headers.get('content-type');
      let returnedData;
      if (contentType && contentType.includes('application/json')) {
        returnedData = await response.json();
      } else {
        returnedData = await response.text();
      }

      if (response.ok) {
        
        console.log('✅ Login successful, got token');
        handleLoginSuccess({
          token: returnedData.token,
          user: returnedData.user
        });
      } else {
        console.error('❌ Login failed:');
        alert(returnedData.error || returnedData.message || 'login failed')
      }
    } catch (err) {
      console.error('🔥 Server error:', err);
      alert('Cannot connect to server. Try again later.');
    }
  };

   function handleIdentField(e) {
      setIdent(e.target.value);
   }

   function handlePskyField(e) {
      setPsky(e.target.value);
   }
   

   function handleFormSubmit(e) {
      e.preventDefault();
      handleLogin();
}

   return(
      <div style={backdrop}>

      <div style={{justifyContent: "center", display: "flex"}}>
         <img style={{padding: "3em", width: "45em", paddingBottom: "0"}}src="/CloudLogBannerWhite.svg"/>
      </div>
      
      <form style={loginContainer} onSubmit={handleFormSubmit}>
         <h3 style={headerStyle}>Please Log In</h3>
         <input 
            className="loginInput"
            style={inputStyle} 
            type="text" 
            placeholder="Email or Username"
            value={ident}
            onChange={handleIdentField}
          />
         <input style={inputStyle} 
            type="password" 
            className="loginInput"
            placeholder="password" 
            value={psky}
            onChange={handlePskyField}
         />
         <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center", marginBottom: "3vh"}}>
            <button type="submit" style={loginButton}>Log In</button>

            {/* <a 
              className="registerLink"
              style={signupPageButton}
              href={`${domain}/register`}
            >
              Create New Account
            </a> */}

         </div>
         


      </form>
      </div>
   )
}

export default LoginScreen;