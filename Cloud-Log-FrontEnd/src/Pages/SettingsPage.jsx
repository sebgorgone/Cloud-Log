import {useState, useEffect} from 'react';
import {getPallette} from "../logInputWidget";
import '../style/loginScreen.css';
import { useAuth } from '../contexts/authContext';

function SettingsPage(props) {

   const pallette = getPallette();

   // const user = props.user;

   const user = { ID: 1}

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


   const [jumpEditPage, setJumpEditPage] = useState();
   const [dzField, setDzField] = useState(false);
   const [rigField, setRigField] = useState(false);
   const [aircraftField, setAircraftField] = useState(false);

   const [rigs, setRigs] = useState(['No saved rigs yet']);
   const [planes, setPlanes] = useState(['No saved planes yet']);
   const [DZs, setDZs] = useState(['No saved dropzones yet']);

   const [defaultRig, setDefualtRig] = useState(null);
   const [defaultAircraft, setDefaultAircraft] = useState(null);
   const [defaultDZ, setDefaultDZ] = useState(null);

   const [addJumpDZ, setAddJumpDZ] = useState();

   //handlers

   function handleCUCLick (e) {
      e.preventDefault();
      setEmailField(false);
      setNewEmail(null)

      setDzField(false);
      setRigField(false);
      setAircraftField(false);

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

      setDzField(false);
      setRigField(false);
      setAircraftField(false);

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

      setDzField(false);
      setRigField(false);
      setAircraftField(false);

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



   function handleDRF (e) {
      e.preventDefault();
      setAircraftField(false);
      setDzField(false);

      setNewUsername(null);
      setNewEmail(null);
      setUsernameField(false);
      setEmailField(false);
      setPasswordField(false);
      setValidatePassword(null);
      setUserValidated(false);
      setNewUserPassword('');
      setCheckNewUserPassword('');

      setRigField(true);
   }

   function handleDDF (e) {
      e.preventDefault();
      setAircraftField(false);
      setRigField(false);

      setNewUsername(null);
      setNewEmail(null);
      setUsernameField(false);
      setEmailField(false);
      setPasswordField(false);
      setValidatePassword(null);
      setUserValidated(false);
      setNewUserPassword('');
      setCheckNewUserPassword('');
      
      setDzField(true);
   }

   function handleDAF (e) {
      e.preventDefault();
      setDzField(false);
      setRigField(false);

      setNewUsername(null);
      setNewEmail(null);
      setUsernameField(false);
      setEmailField(false);
      setPasswordField(false);
      setValidatePassword(null);
      setUserValidated(false);
      setNewUserPassword('');
      setCheckNewUserPassword('');
      
      setAircraftField(true);
   }


  function handleSetFavoriteRig (chute) {

    console.log('chute=', chute)
    if (chute === defaultRig) return
    storeDefaultRig(chute)

  }

  function handleSetFavoriteDZ (dz) {

    console.log('dz=', dz)
    if (dz === defaultDZ) return
    storeDefaultDZ(dz)

  }

  function handleSetFavoriteAircraft (ac) {

    console.log('ac=', ac);
    if (ac === defaultAircraft) return;
    storeDefaultAircraft(ac);

  }

  function handleDZFCancel (e) {
   e.preventDefault();
   setAddJumpDZ("")
   setDzField(false);
  }

   function handleDZInput (e) {
    e.preventDefault()
    if (addJumpDZ.trim() !== ""){
      storeDZ(addJumpDZ)
      getDZs();
      setAddJumpDZ("")
    }
  }

  function handleAddJumpDZChange (e) {
    setAddJumpDZ(e.target.value);
  }

   //time stamp jsx

   function createdAt() {
      if (!userCred) return <p>loading…</p>;

      const raw = userCred[0].created_at;  // e.g. "2025-06-18T12:26:48.000Z"
      const createdDate = new Date(raw);   // JS now knows it’s UTC and converts to your local zone

      // …compute diffDays exactly like before…

      const diffMs   = Date.now() - createdDate;
      const diffDays = Math.floor(diffMs / 86_400_000);

      const monthName = createdDate.toLocaleString('default', { month: 'long' });
      const hour24    = createdDate.getHours();           // already in local
      const ampm      = hour24 >= 12 ? 'pm' : 'am';
      const hour12    = hour24 % 12 || 12;
      const minute    = String(createdDate.getMinutes()).padStart(2, '0');

      return (
        <p>
          User Created {diffDays} Day{diffDays !== 1 ? 's' : ''} ago
          <br />
          '{monthName} {createdDate.getDate()}, {createdDate.getFullYear()}' at {hour12}:{minute} {ampm}
        </p>
      );
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
      marginLeft: ".6em",
      marginBottom: "1.6em"
   }

   const favoriteButtonNull = {
    height: "fit-content",
    background: pallette[2],
    border: "none",
    padding: ".5em",
    paddingTop: ".5em",
    paddingBottom: ".3em",
    borderRadius: "3em",
    marginRight: ".5em",
    marginLeft: ".5em",
  }

  const listDiv = {
    display: "flex", 
    alignItems: "center", 
    justifyContent: "space-between", 
    width: "60%", 
    borderRadius: "1em", 
    background: pallette[0], 
    paddingRight: "1em", 
    margin: "1em"
  }

  const rlStyle = {
   fontFamily: "L1",
   fontSize: "1em",
   padding: ".1em",
   color: pallette[3]
   }

//rendered lists

   const planeList = planes.map((plane, index) => 
       <div key={index} style={listDiv}>
       <p style={rlStyle}>{plane}</p>
       {plane !== 'No saved planes yet' && plane !== defaultAircraft ? <button type="button" style={favoriteButtonNull} onClick={() => handleSetFavoriteAircraft(plane)}><img style={{ width: '1.5em', margin: "0", border: "none"}} src="/favorite-off-svgrepo-com.svg" /></button> : <p>favorited</p>}
     </div>
     );

     const rigList = rigs.map((rig, index) => 
       <div key={index} style={listDiv}>
         <p style={rlStyle}>{rig}</p>
         {rig !== 'No saved rigs yet' && rig !== defaultRig ? <button type="button" style={favoriteButtonNull} onClick={() => handleSetFavoriteRig(rig)}><img style={{ width: '1.5em', margin: "0", border: "none"}} src="/favorite-off-svgrepo-com.svg" /></button> : <p>favorited</p>}
       </div>
     );

     const DZList = DZs.map((DZ, index) => 
       <div key={index} style={listDiv}>
         <p style={rlStyle}>{DZ}</p>
         {DZ !== 'No saved dropzones yet' && DZ !== defaultDZ ? <button type='button' style={favoriteButtonNull} onClick={() => handleSetFavoriteDZ(DZ)}><img style={{ width: '1.5em', margin: "0", border: "none"}} src="/favorite-off-svgrepo-com.svg" /></button> : <p>favorited</p>}
       </div>
     );

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

  const getRigs = async () => {
    try {
      const response = await fetch('http://localhost:5009/getrigs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID}),
      });
      const returnedData = await response.json();
      if(response.ok){
        let foundRigs = [];
        for (let rig of returnedData.results) {
          foundRigs.push(rig.name);
        }
        setRigs([...foundRigs]);
      } else{
        console.error('no rigs imported', response);
      }
    } catch (err) {
      console.error('client failed getting rigs', err);
    }
  };

   const storeRig = async () => {
    try {
      const response = await fetch('http://localhost:5009/storerigs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID, name: addJumpRig }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing rig', err);}
  };

  const getPlanes = async () => {
    try {
      const response = await fetch('http://localhost:5009/getplanes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID}),
      });
      const returnedData = await response.json();
      if(response.ok){
        let foundPlanes = [];
        for (let plane of returnedData.results) {
          foundPlanes.push(plane.name);
        }
        setPlanes([...foundPlanes]);
      } else{
        console.error('no Planes imported', response);
      }
    } catch (err) {
      console.error('client failed plane rigs', err)
    }
  };

  const storePlane = async () => {
    try {
      const response = await fetch('http://localhost:5009/storeplanes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID, name: addJumpAircraft }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing plane', err);}
  }

  const getDZs = async () => {
    try {
      const response = await fetch('http://localhost:5009/getdzs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID}),
      });
      const returnedData = await response.json();
      if(response.ok){
        let foundDZs = [];
        for (let dz of returnedData.results) {
          foundDZs.push(dz.name);
        }
        setDZs([...foundDZs]);
      } else{
        console.error('no DZs imported', response);
      }
    } catch (err) {
      console.error('client failed getting DZs', err);
    }
  };

  const storeDZ = async () => {
    try {
      const response = await fetch('http://localhost:5009/storedz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID, name: addJumpDZ }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing DZ', err);}
  };

    const storeDefaultRig = async (eqpm) => {
    try {
      const response = await fetch('http://localhost:5009/storedefaultrig', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID, rig: eqpm }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
        getDefaults();
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing Defualt', err);}
  };

  const storeDefaultDZ = async (dz) => {
    try {
      const response = await fetch('http://localhost:5009/storedefaultdz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID, dz: dz }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
        getDefaults();
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing Default', err);}
  };

  const storeDefaultAircraft = async (aircraft) => {
    try {
      const response = await fetch('http://localhost:5009/storedefaultaircraft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID, aircraft: aircraft }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
        getDefaults();
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing Default', err);}
  };

  const getDefaults = async () => {
    try {
      const response = await fetch('http://localhost:5009/getdefaults', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID}),
      });
      const returnedData = await response.json();
      const data = returnedData.results[0]
      if(response.ok){
        console.log('retrieved user defaults--> ', 'data: ', data, ' rig: ', data.rig, ' dz: ', data.dz, ' aircraft: ', data.aircraft)
        setDefualtRig(data.rig);
        setDefaultAircraft(data.aircraft);
        setDefaultDZ(data.dz);
      } else{
        console.error('no defaults retrieved', response);
      }
    } catch (err) {
      console.error('client failed getting defaults', err);
    }
  }; 

   //useEffect

   useEffect(() => {
      getUser();
      getDefaults();
      getDZs();
      getRigs();
      getPlanes();
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

                  <p style={textStyle}>Home DZ {defaultDZ ? defaultDZ : 'none'}</p>
                  {!dzField && <button style={changeButton} onClick={handleDDF}>change Home DZ</button>}
                  {dzField && DZList}
                  {dzField &&
                     <form onSubmit={handleDZInput}>
                        <input 
                           style={inputStyle}
                           id="newDZ"
                           type="text" 
                           placeholder="new DZ"
                           value={addJumpDZ}
                           onChange={handleAddJumpDZChange}
                        />
                        <button style={nestedButtonOk}  onClick={handleDZInput}>add</button> 
                     </form>
                  }
                  {dzField && 
                     <button style={nestedButtonCancel} onClick={handleDZFCancel}>hide</button>
                  }

                  <p style={textStyle}>Default Rig {defaultRig ? defaultRig :'none'}</p>
                  {!rigField && <button style={changeButton} onClick={handleDRF}>change default rig</button>}

                  <p style={textStyle}>Default Aircraft {defaultAircraft ? defaultAircraft :'none'}</p>
                  {!aircraftField && <button style={changeButton} onClick={handleDAF}>change default aircraft</button>}
               </div>

            
         </div>
      </div>
   )

}

export default SettingsPage