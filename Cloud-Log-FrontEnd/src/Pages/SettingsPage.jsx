import {useState, useEffect} from 'react';
import {getPallette} from "../logInputWidget";
import '../style/loginScreen.css';
import { useAuth } from '../contexts/authContext';

function SettingsPage(props) {

   const pallette = getPallette();

   const user = props.user;

   const { updateUsername } = useAuth();

   //state

   const [userCred, setUserCred] = useState(null);

   const [usernameField, setUsernameField] = useState(false);

   const [newUsername, setNewUsername] = useState();

   const [emailField, setEmailField] = useState(false);

   const [newEmail, setNewEmail] = useState();

   const [passwordField, setPasswordField] = useState(false);

   const [userValidated, setUserValidated] = useState(false);

   const [validatePassword, setValidatePassword] = useState();

   const [newUserPassword, setNewUserPassword] = useState();

   const [checkNewUserPassword, setCheckNewUserPassword] = useState();

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
   }

   function handleCPClick (e) {
      e.preventDefault();
      setNewUsername(null);
      setNewEmail(null);
      setUsernameField(false);
      setEmailField(false);
      setPasswordField(true);
   }

   function handleValidatePasswordChange (e) {
      setValidatePassword(e.target.value)
   }

   function handleCPCancel (e) {
      e.preventDefault();
      setPasswordField(false);
      setValidatePassword(null);
      setUserValidated(false);
      setNewUserPassword('');
      setCheckNewUserPassword('');
   }

   function handleValidate (e) {
      e.preventDefault();
      validate();
      setValidatePassword('')
   }

   function handleNewUserPasswordChange (e) {
      setNewUserPassword(e.target.value)
   }

   function handleCheckNewUserPasswordChange (e) {
      setCheckNewUserPassword(e.target.value)
   }

   function handleChangePassword (e) {
      e.preventDefault()
      if (newUserPassword.length < 7 || newUserPassword.length > 35) return alert('incorrect passsword length')
      if(newUserPassword === '' || checkNewUserPassword === '') return alert('empty fields');
      if (newUserPassword !== checkNewUserPassword) {
         setNewUserPassword('');
         setCheckNewUserPassword('');
         return alert('passwords do not match');
      }
      changePassword()

   }

   function handleChangeUsername (e) {
      e.preventDefault();
      if (newUsername.length < 5 || newUsername > 24) return alert('Invalid username length')
      changeUsername();
      setNewUsername('');
      setUsernameField(false);
   }

   function handleChangeEmail (e) {
      e.preventDefault();
      if (!newEmail.includes('@') || !newEmail.includes('.')) return alert('Invalid Email')
      changeEmail();
      setNewEmail('');
      setEmailField(false);
   }

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

      return <p>User Created {diffDays} Day{diffDays !== 1 ? 's' : ''} ago <br />'{monthName} {createdDate.getDate()}, {createdDate.getFullYear()}' at {hour12}:{minute} {ampm}</p>;
   }

   //check valid password 

   function checkValidPassword() {
      if(!newUserPassword) return false
      if (newUserPassword.length < 7) return false;
      if (newUserPassword.length > 35) return false;
      return true;
   }
  
   // console.log('in the Settings page', user);

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
      textAlign: "center",
      fontSize: "3em",
   }

   const settingsStyle = {
      display: "flex",
      flexFlow: "column",
      width: "30%"
   }

   const timeStamp = {
      fontSize: ".8em",
      fontFamily: "L1",
      color: pallette[0],
      marginLeft: ".5em"
   }

   const changePasswordButton = {
      border: "none",
      fontFamily: "L1",
      width: "106%",
      borderRadius: "1em",
      paddingBottom: ".2em",
      background: pallette[1],
      color: pallette[4],
   }

   const changeButton = {
      border: "none",
      marginBottom: "1em",
      fontFamily: "L1",
      width: "90%",
      borderRadius: "1em",
      paddingBottom: ".2em",
      background: pallette[3],
      color: pallette[0],
   }

   const inputStyle = {
      width: "60%",
      fontFamily: "L1",
      fontSize: "1.em",
      padding: ".2em",
      textAlign: "center",
      margin: "0",
      marginBottom: ".5em",
      background: pallette[3],
      color: pallette[0],
      border: "solid .1em",
      borderColor: pallette[0],
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
      marginLeft: ".5em",
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

   const validate = async () => {
    try {
      const response = await fetch('http://localhost:5009/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.ID, password: validatePassword }),
      });

      const contentType = response.headers.get('content-type');
      let returnedData;
      if (contentType && contentType.includes('application/json')) {
        returnedData = await response.json();
      } else {
        returnedData = await response.text();
      }

      if (response.ok) {
        
        console.log('✅ validation success', response.ok);
        setUserValidated(true);

      } else {
        console.error('❌ validation failed:', returnedData);
        alert(returnedData.error || returnedData.message || 'bad password')
      }
    } catch (err) {
      console.error('error', err);
      alert('Error');
    }
  };

  const changePassword = async () => {
    try {
      const response = await fetch('http://localhost:5009/changepassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.ID, password: newUserPassword }),
      });

      const contentType = response.headers.get('content-type');
      let returnedData;
      if (contentType && contentType.includes('application/json')) {
        returnedData = await response.json();
      } else {
        returnedData = await response.text();
      }

      if (response.ok) {
        
        console.log('✅ password change success', response.ok);

        setNewUserPassword('');
        setCheckNewUserPassword('');

        setUserValidated(false);

        setPasswordField(false);

        alert('Changed Password')
        

      } else {
        console.error('❌ password change failed:', returnedData);
        alert(returnedData.error || returnedData.message || 'bad password')
      }
    } catch (err) {
      console.error('error', err);
      alert('Error');
    }
  };

  const changeUsername = async () => {
    try {
      const response = await fetch('http://localhost:5009/changeusername', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newUsername, id: user.ID }),
      });

      const contentType = response.headers.get('content-type');
      let returnedData;
      if (contentType && contentType.includes('application/json')) {
        returnedData = await response.json();
      } else {
        returnedData = await response.text();
      }

      if (response.ok) {
        
        console.log('✅ username change success', response.ok);
        updateUsername(newUsername)

      } else {
        console.error('❌ username change failed:', returnedData);
        alert(returnedData.error || returnedData.message || 'error')
      }
    } catch (err) {
      console.error('error', err);
      alert('Error');
    }
  };

  const changeEmail = async () => {
    try {
      const response = await fetch('http://localhost:5009/changeemail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail, id: user.ID }),
      });

      const contentType = response.headers.get('content-type');
      let returnedData;
      if (contentType && contentType.includes('application/json')) {
        returnedData = await response.json();
      } else {
        returnedData = await response.text();
      }

      if (response.ok) {
        
        console.log('✅ email change success', response.ok);
        getUser();

      } else {
        console.error('❌ email change failed:', returnedData);
        alert(returnedData.error || returnedData.message || 'error')
      }
    } catch (err) {
      console.error('error', err);
      alert('Error');
    }
  };

   //useEffect

   useEffect(() => {
      getUser();
   }, [])

   return(
      <div>
         <div style={shell}>
            <br />

            <img style={{aspectRatio: '5 /1', width: '100%',paddingTop: "2em", margin: "0"}} src="/CloudLogBannerWhite.svg" />
            <h1 style={headerStyle}>Settings</h1>

            {passwordField ? 
            
               userValidated ? 


                  <div style={settingsStyle}>
                     <p style={textStyle}>Enter Your New Password</p>
                     <input 
                        style={inputStyle}
                        type='password'
                        placeholder="new password"
                        value={newUserPassword}
                        onChange={handleNewUserPasswordChange}
                     />

                     {checkValidPassword() && 
                        <div>
                           <p style={textStyle}>Confirm Your New Password</p>
                           <input 
                              style={inputStyle}
                              placeholder="new password"
                              type='password'
                              value={checkNewUserPassword}
                              onChange={handleCheckNewUserPasswordChange}
                           />
                        </div>}

                     <div>
                        {checkValidPassword() && <button style={nestedButtonOk} onClick={handleChangePassword}>Change Password</button>}
                        <button style={nestedButtonCancel} onClick={handleCPCancel}>Cancel</button>
                     </div>

                  </div> 
                  : 

                  <form style={settingsStyle} onSubmit={handleValidate}>
                     <p style={textStyle}>Enter Your Current Password</p>
                     <div style={{marginBottom: ".75em"}}>
                        <input 
                           style={inputStyle}
                           value={validatePassword}
                           onChange={handleValidatePasswordChange}
                           type="password"
                           placeholder="password"
                        />
                        <button style={nestedButtonOk} onClick={handleValidate}>Enter</button>
                        <button style={nestedButtonCancel} onClick={handleCPCancel}>cancel</button>
                     </div>
                  </form> 

               : 
            
                  <div style={settingsStyle}>
                  

                     <p style={textStyle}>User: {user ? user.name: 'loading...'}</p>

                     {!usernameField && <button style={changeButton} onClick={handleCUCLick}>change username</button>}

                     {usernameField && 
                        <form onSubmit={handleChangeUsername}>
                           <input 
                              value={newUsername}
                              onChange={handleNewUserChange}
                              style={inputStyle}
                              placeholder='change username' 
                           />
                        </form>
                     }

                     {usernameField && <div style={{marginBottom: ".75em"}}>
                        <button style={nestedButtonOk} onClick={handleChangeUsername}>change username</button>
                        <button style={nestedButtonCancel} onClick={handleCUCancel}>cancel</button>
                     </div>}
                     
                     <p style={textStyle}>Email: {userCred ? userCred[0].email : 'loading...'}</p>
                     
                     {!emailField && <button style={changeButton} onClick={handleCEClick}>change email</button>}
                     
                     {emailField && 
                        <form onSubmit={handleChangeEmail}>
                           <input 
                              value={newEmail}
                              onChange={handleNewEmailChange}
                              style={inputStyle}
                              placeholder="change email" 
                           />
                        </form>
                     }

                     {emailField && <div style={{marginBottom: ".75em"}}>
                        <button style={nestedButtonOk} onClick={handleChangeEmail}>change email</button>
                        <button style={nestedButtonCancel} onClick={handleCECancel}>cancel</button>
                     </div>}
                     
                     
                     
                     <button style={changePasswordButton} onClick={handleCPClick}>change password</button>
                     
                     <p style={timeStamp}>{createdAt()}</p>
                     
                     
                  </div>
               }

               <div style={settingsStyle}>

                  <p style={textStyle}>Edit Stored Jumps</p>
                  <button style={changeButton}>edit records</button>

                  <p style={textStyle}>Home DZ {'loading..'}</p>
                  <button style={changeButton}>change Home DZ</button>

                  <p style={textStyle}>Default Rig {'loading...'}</p>
                  <button style={changeButton}>change default rig</button>

                  <p style={textStyle}>Default Aircraft {'loading...'}</p>
                  <button style={changeButton}>change default aircraft</button>
               </div>

            
         </div>
      </div>
   )

}

export default SettingsPage