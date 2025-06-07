import {useState} from 'react';
import {getPallette} from "../logInputWidget";
import '../style/loginScreen.css';
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from '../contexts/authContext';



function LoginScreen () {

   const host = 'http://localhost:5173';

   const nav = useNavigate();
   const { login, user } = useAuth();

   const [ident, setIdent] = useState("");
   const [psky, setPsky] = useState("");
   if (user) {
      return <Navigate to="/" replace />
   }
   //pallette v
   const pallette = getPallette();
   console.log("LOGIN PALLETTE:" + [...pallette]);

   //styles vv
   const backdrop = {
      backgroundColor: pallette[3],
      position: "fixed",
      minWidth: "100%",
      minHeight: "100%",
   }
   const loginContainer = {
      background: pallette[4],
      border: "solid 0.3em",
      borderColor: pallette[2],
      padding: "1vw",
      maxWidth: "28em",
      margin: "auto",
      marginTop: "10vh",
      minHeight: "20em"
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
      const response = await fetch('http://localhost:5009/login', {
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
        console.error('❌ Login failed:', returnedData);
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



   return(
      <div style={backdrop}>
      <div style={loginContainer}>
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
            type="text" 
            className="loginInput"
            placeholder="password" 
            value={psky}
            onChange={handlePskyField}
         />
         <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center", marginBottom: "3vh"}}>
            <button onClick={handleLogin} style={loginButton}>Log In</button>

            <a className="registerLink"style={signupPageButton} href={`${host}/register`}>Create New Account</a>

         </div>
         


      </div>
      </div>
   )
}

export default LoginScreen;