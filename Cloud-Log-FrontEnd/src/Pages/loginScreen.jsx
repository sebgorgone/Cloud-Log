import {useState} from 'react';
import {getPallette} from "../logInputWidget"
import '../style/loginScreen.css'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/authContext';



function LoginScreen () {

   const nav = useNavigate();
   const { login } = useAuth();

   //pallette v
   const pallette = getPallette()
   console.log("LOGIN PALLETTE:" + [...pallette])
   const loginContainer = {
      background: pallette[2],
      border: "solid 0.3em",
      borderColor: pallette[3],
      padding: "1vw",
      maxWidth: "75%",
      margin: "auto",
   }

   //styles vv
   const headerStyle = {
      color: pallette[4],
      fontFamily: "L1",
   }

   const inputStyle = {
      fontFamily: "L1",
      color: pallette[4],
      background: pallette[1],
      margin: "8vh auto",
      minWidth: "75%",
      display: "block",
   }

   //state hooks

   const [ident, setIdent] = useState("");
   const [psky, setPsky] = useState("");
   


   //handlers vv

   const handleLoginSuccess = (data) => {
      login(data);
      nav('/');

   }


   const handleLogin = async () => {
      try {
      const response = await fetch("http://localhost:5009/login", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ identifier: ident, password: psky }),
      });

      const contentType = response.headers.get("content-type");

      let returnedData;
      if (contentType && contentType.includes("application/json")) {
         returnedData = await response.json();
      } else {
         returnedData = await response.text(); // fallback if server sent plain text
      }

      if (response.ok) {
         console.log("✅ Login Successful", returnedData.userRef);
         handleLoginSuccess(returnedData.userRef);
      } else {
         console.error("❌ Login Failed", returnedData);
      }

   } catch (err) {
      console.error("🔥 Server Error", err);
   }
   };
   function handleIdentField(e) {
      setIdent(e.target.value);
   }

   function handlePskyField(e) {
      setPsky(e.target.value);
   }



   return(
      <div style={loginContainer}>
         <h3 style={headerStyle}>Please Log In</h3>
         <input style={inputStyle} 
            type="text" 
            placeholder="Email or Username"
            value={ident}
            onChange={handleIdentField}
          />
         <input style={inputStyle} 
            type="text" 
            placeholder="password" 
            value={psky}
            onChange={handlePskyField}
         />
         <button onClick={handleLogin}>Log In</button>


      </div>
   )
}

export default LoginScreen;