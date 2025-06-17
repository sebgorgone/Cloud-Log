import {useState, useEffect} from 'react';
import {getPallette} from "../logInputWidget";
import '../style/loginScreen.css';

function SettingsPage(props) {

   const pallette = getPallette();

   const user = props.user;


   //state

   const [userCred, setUserCred] = useState(null);

   const [usernameField, setUsernameField] = useState(false);

   const [newUsername, setNewUsername] = useState();

   const [emailField, setEmailField] = useState(false);

   const [newEmail, setNewEmail] = useState();

   const [passwordField, setPasswordField] = useState(false);

   //handlers

   function handleCUCLick (e) {
      e.preventDefault();
      setEmailField(false);
      setNewEmail(null)
      setUsernameField(true);
   }

   function handleCUCancel (e) {
      e.preventDefault();
      setNewUsername(null)
      setUsernameField(false)
   }

   function handleNewUserChange (e) {
      setNewUsername(e.target.value);
      console.log(newUsername)
   }

   function handleCEClick (e) {
      e.preventDefault();
      setUsernameField(false)
      setNewUsername(null)
      setEmailField(true);

   }

   function handleCECancel (e) {
      e.preventDefault();
      setNewEmail(null)
      setEmailField(false)
   }

   function handleNewEmailChange (e) {
      setNewEmail(e.target.value);
      console.log(newEmail);
   }

   function handleCPClick (e) {}

   //time stamp jsx

   function createdAt () {

      if (!userCred) return <p>loading...</p>;

      const raw = userCred[0].created_at;
      
      const [datePart, timePart] = raw.split('T');
      const [year, month, day]     = datePart.split('-');
      const [hour, minute, second] = timePart.split(':');
      const [realSeconds, bullsh] = second.split('.')

      const createdDate = new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10),
        parseInt(hour, 10),
        parseInt(minute, 10),
        parseInt(realSeconds, 10)
      );
            // 4. Compute difference in days
      const now      = new Date();
      const diffMs   = now - createdDate;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            // 5. Turn month number into name
      const monthName = createdDate.toLocaleString('default', { month: 'long' });
            // 6. Return the formatted string
      const hour24 = createdDate.getHours();
      const ampm   = hour24 >= 12 ? 'pm' : 'am';
      const hour12 = hour24 % 12 || 12; // turns 0→12, 13→1, 12→12

      return <p>Created {diffDays} Day{diffDays !== 1 ? 's' : ''} ago <br />'{monthName} {createdDate.getDate()}, {createdDate.getFullYear()}' at {hour12}:{minute} {ampm}</p>;
   }
  
   console.log('in the Settings page', userCred);

   //style

   const shell = {
      marginTop: "5em",
      marginLeft: "4.3em",
      paddingLeft: "1em",
      paddingBottom: "1em",
      background: pallette[2],
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around"
   }

   const headerStyle = {
      width: "100%",
      fontFamily: "L1",
      color: pallette[0],
      textAlign: "center"
   }

   const settingsStyle = {
      display: "flex",
      flexFlow: "column",
      width: "40%"
   }

   const timeStamp = {
      fontSize: ".6em",
      fontFamily: "L1",
      color: pallette[0]
   }

   const changePasswordButton = {
      border: "none",
      fontFamily: "L1",
      width: "70%",
      borderRadius: "1em",
      paddingBottom: ".2em",
      background: pallette[1],
      color: pallette[4],
   }

   const changeButton = {
      border: "none",
      marginBottom: "1em",
      fontFamily: "L1",
      width: "50%",
      borderRadius: "1em",
      paddingBottom: ".2em",
      background: pallette[3],
      color: pallette[0],
   }

   const inputStyle = {
      width: "1000vw",
      fontFamily: "L1",
      fontSize: "1.em",
      padding: ".2em",
      margin: "0",
      marginBottom: ".5em",
      background: pallette[3],
      color: pallette[0]
   }

   const textStyle = {
      fontFamily: "L1",
      margin: "0",
      marginTop: "0",
      marginBottom: ".5em",
      background: pallette[4],
      borderRadius: "1em",
      color: pallette[0],
      width: "100%",
      padding: ".5em",
      textAlign: "center",
   }

   const nestedButtonOk = {
      border: "none",
      fontSize: ".6em",
      fontFamily: "L1",
      borderRadius: "1em",
      paddingBottom: ".4em",
      background: pallette[1],
      color: pallette[4],
   }

   const nestedButtonCancel = {
      border: "none",
      fontSize: ".6em",
      fontFamily: "L1",
      borderRadius: "1em",
      paddingBottom: ".4em",
      background: pallette[4],
      color: pallette[1],
      marginLeft: ".6em"
   }

   //api

   const getUser = async () => { 
      setUserCred(null);
      // console.log('getting user credentials')
      try {
         const response = await fetch('http://localhost:5009/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({user_id: user.ID}),
         });
         const data = await response.json();
         if(data.ok){

            setUserCred(data.results);
            console.log('set user data', data.results)
               
         }
         else {
            console.error('data not found', data)
         }
      } catch (err) {
         console.error('client failed to load user data')
      }
   }

   //useEffect

   useEffect(() => {
      getUser();
   }, [])

   return(
      <div>
         <div style={shell}>
            <br />

            <h1 style={headerStyle}>Settings</h1>

            {passwordField ? 
            
            <div>
               <p>pasword prompt</p>
            </div> 
            
            : 
            
            <div style={settingsStyle}>


               <p style={textStyle}>User: {user ? user.name: 'loading...'}</p>

               {!usernameField && <button style={changeButton} onClick={handleCUCLick}>change username</button>}

               {usernameField && <input 
                  value={newUsername}
                  onChange={handleNewUserChange}
                  style={inputStyle}
                  placeholder='change username' 
               />}

               {usernameField && <div style={{marginBottom: ".75em"}}>
                  <button style={nestedButtonOk}>change username</button>
                  <button style={nestedButtonCancel} onClick={handleCUCancel}>cancel</button>
               </div>}

               <p style={textStyle}>Email: {userCred ? userCred[0].email : 'loading...'}</p>

               {!emailField && <button style={changeButton} onClick={handleCEClick}>change email</button>}

               {emailField && <input 
                  value={newEmail}
                  onChange={handleNewEmailChange}
                  style={inputStyle}
                  placeholder="change email" 
               />}

               {emailField && <div style={{marginBottom: ".75em"}}>
                  <button style={nestedButtonOk}>change email</button>
                  <button style={nestedButtonCancel} onClick={handleCECancel}>cancel</button>
               </div>}



               <button style={changePasswordButton}>change password</button>

               <p style={timeStamp}>{createdAt()}</p>


            </div>}

            
         </div>
      </div>
   )

}

export default SettingsPage