import {useState, useEffect} from 'react';
import {getPallette} from "../logInputWidget";
import '../style/loginScreen.css';
import { useAuth } from '../contexts/authContext';
import EditJumpWidget from '../components/EditJumpWidget';
import JumpWidgetDisp from '../components/JumpWidgetDisp';
import JumpWidgetDel from '../components/JumpWidgetDel';

function SettingsPage(props) {

  const svr = import.meta.env.VITE_SVR_URL;

   const pallette = getPallette();

   const user = props.user;

   const jumps = props.jumps;

   const { updateUsername } = useAuth();

   const favoriteIcon = <img style={{width: "1.5em", marginLeft: ".575em"}} src="/favorite-svgrepo-com.svg" />

   const backIcon = <img style={{width: ".8em", aspectRatio: "1 /1", paddingRight: "1em"}} src="/back-arrow-to-first-track-svgrepo-com(1).svg" />

   //state

   const [userCred, setUserCred] = useState(null);

   const [usernameField, setUsernameField] = useState(false);

   const [newUsername, setNewUsername] = useState();

   const [emailField, setEmailField] = useState(false);

   const [newEmail, setNewEmail] = useState();

   const [passwordField, setPasswordField] = useState(false);

   const [validateField, setValidateField] = useState(false);

   const [flag, setFlag] = useState(false);


   const [userValidated, setUserValidated] = useState(false);

   const [validateValue, setValidateValue] = useState(false)


   const [validatePassword, setValidatePassword] = useState();

   const [newUserPassword, setNewUserPassword] = useState();

   const [checkNewUserPassword, setCheckNewUserPassword] = useState();

   const [editedJump, setEditedJump] = useState(null);


   const [jumpEditPage, setJumpEditPage] = useState(false);
   const [editAJump, setEditAJump] = useState(false);
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
   const [addJumpRig, setAddJumpRig] = useState();
   const [addJumpAircraft, setAddJumpAircraft] = useState();

   const [page, setPage] = useState(0);

   const [feedback, setFeedback] = useState()

   //handlers

   function handleCUCLick (e) {
      e.preventDefault();
      setEmailField(false);
      setNewEmail(null)

      setDzField(false);
      setRigField(false);
      setAircraftField(false);

      setAddJumpDZ("");
      setAddJumpRig("");
      setAddJumpAircraft("");

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

      setAddJumpDZ("");
      setAddJumpRig("");
      setAddJumpAircraft("");

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

      setAddJumpDZ("");
      setAddJumpRig("");
      setAddJumpAircraft("");

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

   function handleChangeValidVal (e) {
      setValidateValue(e.target.value)
   }



   function handleDRF (e) {
      e.preventDefault();
      setAircraftField(false);
      setDzField(false);

      setAddJumpDZ("");
      setAddJumpAircraft("");

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

      setAddJumpRig("");
      setAddJumpAircraft("");

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

      setAddJumpDZ("");
      setAddJumpRig("");

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

   async function handleDZInput (e) {
    e.preventDefault();
    for (let d of DZs){
      if (addJumpDZ === d) return alert('Dropzone already exists')
    }
    if (addJumpDZ.trim() !== ""){
      await storeDZ(addJumpDZ);
      setDZs([...DZs, addJumpDZ]);
      setAddJumpDZ("")
    }
  }

  function handleAddJumpDZChange (e) {
    setAddJumpDZ(e.target.value);
  }

  function handleRFCancel (e) {
   e.preventDefault();
   setAddJumpRig("")
   setRigField(false);
  }

  function handleAFCancel (e) {
   e.preventDefault();
   setAddJumpAircraft("");
   setAircraftField(false);
  }

  async function handleAircraftInput (e) {
    e.preventDefault();
    for (let a of planes){
      if (addJumpAircraft === a) return alert('Aircraft already exists')
    }
    if (addJumpAircraft.trim() !== ""){
      await storePlane(addJumpAircraft);
      setPlanes([...planes, addJumpAircraft]);
      setAddJumpAircraft("");
    }
  }

  async function handleRigInput (e) {
    e.preventDefault();
    for (let r of rigs) {
      if (addJumpRig === r) return alert('rig already exists')
    }
    if (addJumpRig.trim() !== ""){
      await storeRig();
      setRigs([...rigs, addJumpRig]);
      setAddJumpRig("");
    }
  }

  function handleAddJumpAircraftChange (e) {
    setAddJumpAircraft(e.target.value);
  }

  function handleAddJumpRigChange (e) {
    setAddJumpRig(e.target.value);
  }


  function handleERClick (e) {
      e.preventDefault();

      setDzField(false);
      setRigField(false);
      setAircraftField(false);

      setAddJumpDZ("");
      setAddJumpRig("");
      setAddJumpAircraft("");

      setNewUsername(null);
      setNewEmail(null);
      setUsernameField(false);
      setEmailField(false);
      setPasswordField(false);
      setValidatePassword(null);
      setUserValidated(false);
      setNewUserPassword('');
      setCheckNewUserPassword('');

      setJumpEditPage(true);
  }

  function handleERCancel (e) {
   e.preventDefault();

   setPage(0);
   setEditAJump(false);
   setEditedJump(null);

   setValidateValue('');
   // setValidated(false);

   setJumpEditPage(false);
  }


  function handleNextPage (e) {
   if (page > Math.floor(props.jump_num / 15)-1) return
   if ((page * 15) + 15 === props.jump_num)  return
   setPage(page + 1);
  }

  function handlePrevPage (e) {
   if (page === 0) return
   setPage(page - 1)

  }

    function handleEJCancel (e) {
   e.preventDefault();

   setEditedJump(null);

   setEditAJump(false);
  }

  function handleEditJumpButton(jump) {
   console.log('set edited jump', jump);
   setEditedJump(jump);
   setEditAJump(true);
  }

  function handleDeleteJumpButton(jump) {
   console.log('deleting jump', jump.jump_id);
   setValidateField(true);
   setEditedJump(jump);
   
  }

  function checkValidPasswordDel (e) {
   e.preventDefault();
   validate1(editedJump);
   console.log('checking valid password')
  }

  function handleDVCancel (e) {
   e.preventDefault();

   setPage(0);
   setValidateField(false);
   setEditedJump(null);

   setValidateValue('');

  }

  function handleFeedbackSubmit () {
    if (feedback === '' || !feedback) return alert('retard')
    console.log('sending feedback data -- message: ', feedback);
    sendFeedback();
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

   const feedbackStyle = {
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      width: "70%"
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
      width: "100%",
      borderRadius: "1em",
      paddingBottom: ".2em",
      background: pallette[1],
      color: pallette[4],
   }

   const submitButton = {
      border: "none",
      fontFamily: "L1",
      width: "7em",
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
      width: "100%",
      fontFamily: "L1",
      fontSize: "1em",
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
      width: "5em"
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
      marginBottom: "1.6em",
      width: "6em"
   }

   const favoriteButtonNull = {
    height: "fit-content",
    background: pallette[2],
    border: "none",
    padding: ".5em",
    paddingTop: ".5em",
    paddingBottom: ".3em",
    borderRadius: "3em",
    marginLeft: ".5em",
  }

  const listDiv = {
    display: "flex", 
    alignItems: "center", 
    justifyContent: "right", 
    width: "100%", 
    borderRadius: "1em", 
    background: pallette[0], 
    paddingRight: "1em", 
    margin: ".3em"
  }

  const rlStyle = {
   fontFamily: "L1",
   fontSize: ".7em",
   paddingLeft: ".7em",
   paddingBottom: "0em",
   color: pallette[3]
   }

   const backButton = {
      border: "none",
      fontFamily: "L1",
      width: "30%",
      borderRadius: "1em",
      paddingBottom: ".2em",
      background: pallette[3],
      color: pallette[0],
      marginBottom: "1.5em",
   }

   const returnButton = {
      border: "none",
      fontFamily: "L1",
      borderRadius: "1em",
      paddingBottom: ".2em",
      background: pallette[4],
      color: pallette[1],
      marginLeft: ".6em",
      width: "9em",
      marginBottom: "1.5em",
   }

   const pageButton = {
      border: "none",
      fontFamily: "L1",
      width: "3em",
      borderRadius: "1em",
      paddingBottom: ".2em",
      background: pallette[3],
      color: pallette[0],
      marginBottom: "0em",
      marginTop: "1em",
   }

   const textHeaderStyle = {
      fontFamily: "L1",
      marginTop: "1em",
      marginBottom: "0",
      background: pallette[4],
      borderRadius: "1em",
      color: pallette[0],
      width: "30%",
      padding: ".5em",
      textAlign: "center",
   }

   const delButton = {
      border: "none",
      fontFamily: "L1",
      fontSize: ".6em",
      borderRadius: "1em",
      paddingBottom: ".2em",
      background: pallette[4],
      color: 'red',
      marginLeft: ".6em",
      width: "4em",
      marginBottom: ".5em",
   }

   const feedbackHeaderStyle = {
      fontFamily: "L1",
      marginTop: ".5em",
      marginBottom: "0",
      color: pallette[4],
      padding: ".5em",
      textAlign: "center",
      fontSize: "1.5em"
   }
//rendered lists

   const planeList = Array.isArray(planes) ? planes.map((plane, index) => 
      <div key={index} style={listDiv}>
         <p style={rlStyle}>{plane}</p>
         {plane !== 'No saved planes yet' && <button style={delButton} type="button" onClick={() => validDel(plane, 'aircraft', 'planes')}>delete</button>}
         {plane === 'No saved planes yet'
              ? null
              : plane !== defaultAircraft
                ? (
                  <button
                    type="button"
                    style={favoriteButtonNull}
                    onClick={() => handleSetFavoriteAircraft(plane)}
                  >
                    <img
                      style={{ width: '1em', margin: 0, border: 'none' }}
                      src="/favorite-off-svgrepo-com.svg"
                      alt="mark favorite"
                    />
                  </button>
                )
                : favoriteIcon
            }
      </div>
   ):
         <div style={listDiv}>
            <p style={rlStyle}>No saved planes yet</p>
         </div>;

   const rigList = Array.isArray(rigs) ? rigs.map((rig, index) => 
          <div key={index} style={listDiv}>
            <p style={rlStyle}>{rig}</p>
            {rig !== 'No saved rigs yet' && <button style={delButton} type="button" onClick={() => validDel(rig, 'equipment', 'rigs')}>delete</button>}
            {rig === 'No saved rigs yet'
              ? null
              : rig !== defaultRig
                ? (
                  <button
                    type="button"
                    style={favoriteButtonNull}
                    onClick={() => handleSetFavoriteRig(rig)}
                  >
                    <img
                      style={{ width: '1em', margin: 0, border: 'none' }}
                      src="/favorite-off-svgrepo-com.svg"
                      alt="mark favorite"
                    />
                  </button>
                )
                : favoriteIcon
            }
         
         </div>
         ):
         <div style={listDiv}>
            <p style={rlStyle}>No saved rigs yet</p>
         </div>;

   const DZList = Array.isArray(DZs) ? DZs.map((dz, index) => 
      <div key={index} style={listDiv}>
        <p style={rlStyle}>{dz}</p>
        {dz !== 'No saved dropzones yet' && <button style={delButton} type="button" onClick={() => validDel(dz, 'dz', 'dropzones')}>delete</button>}
        {dz === 'No saved dropzones yet'
              ? null
              : dz !== defaultDZ
                ? (
                  <button
                    type="button"
                    style={favoriteButtonNull}
                    onClick={() => handleSetFavoriteDZ(dz)}
                  >
                    <img
                      style={{ width: '1em', margin: 0, border: 'none' }}
                      src="/favorite-off-svgrepo-com.svg"
                      alt="mark favorite"
                    />
                  </button>
                )
                : favoriteIcon
            }
         
         </div>
         ):
         <div style={listDiv}>
            <p style={rlStyle}>No saved dropzones yet</p>
         </div>;

   const jumpList = Array.isArray(jumps)
      ? jumps.slice(page * 15, (page * 15) + 15).map((jump, idx) => (
         <div key={idx} style={{marginTop: "2em", display: "flex", alignItems: "center"}}>
           <JumpWidgetDisp 
             jumpNum={jump.jump_num}
             jumpDate={jump.jump_date.slice(0,10)}
             dz={jump.dz}
             aircraft={jump.aircraft}
             rig={jump.equipment}
             exitAlt={jump.alt}
             time={jump.t}
             notes={jump.notes}
             jump_id={jump.jump_id}
             context="gathered"
             edit={() => handleEditJumpButton(jump)}
             delete={() => {props.set_false(); handleDeleteJumpButton(jump)}}
           />
           {/* <button type="button" style={editOk} onClick={() => handleEditJumpButton(jump)}>edit</button> */}
         </div>
      ))
  : null;

   //api

   const getUser = async () => { 
      setUserCred(null);
      // console.log('getting user credentials')
      try {
         const response = await fetch(`${svr}/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({user_id: user.ID}),
         });
         const data = await response.json();
         if(data.ok){

            setUserCred(data.results);
               
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
      const response = await fetch(`${svr}/validate`, {
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

   const validate1 = async (jump) => {
      const Jump = jump
      console.log(jump)
    try {
      const response = await fetch(`${svr}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.ID, password: validateValue }),
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
        deleteJump(jump.jump_id);
        setValidateValue('')

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
      const response = await fetch(`${svr}/changepassword`, {
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
      const response = await fetch(`${svr}/changeusername`, {
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
      const response = await fetch(`${svr}/changeemail`, {
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

   const storeRig = async () => {
    try {
      const response = await fetch(`${svr}/storerigs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID, name: addJumpRig }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing rig', err);}
  };

  const storePlane = async () => {
    try {
      const response = await fetch(`${svr}/storeplanes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID, name: addJumpAircraft }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing plane', err);}
  }

  const storeDZ = async () => {
    try {
      const response = await fetch(`${svr}/storedz`, {
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
      const response = await fetch(`${svr}/storedefaultrig`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID, rig: eqpm }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
        setDefualtRig(eqpm);
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing Defualt', err);}
  };

  const storeDefaultDZ = async (dz) => {
    try {
      const response = await fetch(`${svr}/storedefaultdz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID, dz: dz }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
        setDefaultDZ(dz);
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing Default', err);}
  };

  const storeDefaultAircraft = async (aircraft) => {
    try {
      const response = await fetch(`${svr}/storedefaultaircraft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID, aircraft: aircraft }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
        setDefaultAircraft(aircraft)
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing Default', err);}
  };

  const deleteJump = async (id) => {
   try {
      const response = await fetch(`${svr}/deletejump`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jump_id: id}),
      });
      if(response.ok){
        console.log('deleted user jump--> ', 'jump_id: ', id)
        alert('Jump Deleted');
        props.rst();
      } else{
        console.error('err while deleting jump', response);
      }
    } catch (err) {
      console.error('client failed deleting jumps', err);
      props.rst();
    }
  }

  const validDel = async (val, field, table) => {
     try {
       const response = await fetch(`${svr}/validatedelete`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ value: val, field }),
       });

       if (response.status === 204) {
         console.log(
           'not associated to any jumps →',
           'value:', val,
           'field:', field
         );
         deleteFromTable(val, table);
         return true
       }

       const data = await response.json();

       if (response.ok && data.ok) {
         console.log(
           'not associated to any jumps →',
           'value:', val,
           'field:', field
         );
         
         return
       } else {
         const numList = data.result.map (({ jump_num }) => jump_num);
         alert(`Cannot Delete ${field} "${val}" - Delete or revise the jump numbers if you are going to delete this ${field}--  ${numList.join(' - ')}`);
         console.error('invalid Delete', data);
       }
     } catch (err) {
       console.error('client failed deleting', err);
       return
     }
   };

  const deleteFromTable = async (value, table) => {
   try {
      const response = await fetch(`${svr}/deleteft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: value, table: table, user_id: user.ID}),
      });
      if(response.ok){
        console.log(`deleted ${value}`)
        // setFlag(!flag);
        // props.rst();

        table === 'planes' && setPlanes(planes.filter(n => n !== value))
        table === 'rigs' && setRigs(rigs.filter(n => n !== value));
        table === 'dropzones' && setDZs(DZs.filter(n => n !== value));


      } else{
        console.error(`err while deleting ${value}`, response);
      }
    } catch (err) {
      console.error(`client failed deleting ${value}`, err);
    }
  }

  const sendFeedback = async () => {
    try {
      const response = await fetch(`${svr}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.ID, message: feedback }),
      });
      const returnedDATA = await response.json();
      if (response.ok) {
         alert('Thank you for your feedback!');
         setFeedback('');
      } else {alert(returnedDATA.message)}
    } catch (err) {console.error('client failed storing rig', err);}
  };

   //useEffect

   useEffect(() => {
    getUser();
    if (props.defaults) {
      setDefaultAircraft(props.defaults.plane);
      setDefualtRig(props.defaults.rig);
      setDefaultDZ(props.defaults.dz);
    }
    if (props.defaults) {
      setDefaultAircraft(props.defaults.plane);
      setDefualtRig(props.defaults.rig);
      setDefaultDZ(props.defaults.dz);
    }
  
    if (props.rigs) {
      setRigs(props.rigs);
    }
  
    if (props.DZs) {
      setDZs(props.DZs);
    }
  
    if (props.planes) {
      setPlanes(props.planes);
    }

      setEditAJump(false);
      setValidateField(false);
      setValidateValue('');

   }, [flag])

  return (
  <div>
    <div style={shell}>
      <br />
      <img
        style={{
          aspectRatio: '5 /1',
          width: '80%',
          paddingTop: '2em',
          paddingRight: '8%',
          margin: '0'
        }}
        src="/CloudLogBannerWhite.svg"
      />
      {editAJump ? <h1 style={headerStyle}>Edit Jump Number: {editedJump.jump_num}</h1> : <h1 style={headerStyle}>{!jumpEditPage ? 'Settings' : 'Edit Jumps'}</h1>}

      {!jumpEditPage ? (
        <>
          {passwordField ? (
            userValidated ? (
              <div style={settingsStyle}>
                <p style={textStyle}>Enter Your New Password</p>
                <input
                  style={inputStyle}
                  type="password"
                  placeholder="new password"
                  value={newUserPassword}
                  onChange={handleNewUserPasswordChange}
                />
                {checkValidPassword() && (
                  <div>
                    <p style={textStyle}>Confirm Your New Password</p>
                    <input
                      style={inputStyle}
                      placeholder="new password"
                      type="password"
                      value={checkNewUserPassword}
                      onChange={handleCheckNewUserPasswordChange}
                    />
                  </div>
                )}
                <div>
                  {checkValidPassword() && (
                    <button style={nestedButtonOk} onClick={handleChangePassword}>
                      Change Password
                    </button>
                  )}
                  <button style={nestedButtonCancel} onClick={handleCPCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <form style={settingsStyle} onSubmit={handleValidate}>
                <p style={textStyle}>Enter Your Current Password</p>
                <div style={{ marginBottom: '.75em' }}>
                  <input
                    style={inputStyle}
                    value={validatePassword}
                    onChange={handleValidatePasswordChange}
                    type="password"
                    placeholder="password"
                  />
                  <button style={nestedButtonOk} onClick={handleValidate}>
                    Enter
                  </button>
                  <button style={nestedButtonCancel} onClick={handleCPCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            )
          ) : (
            <div style={settingsStyle}>
              <p style={textStyle}>User: {user ? user.name : 'loading...'}</p>
              {!usernameField && (
                <button style={changeButton} onClick={handleCUCLick}>
                  change username
                </button>
              )}
              {usernameField && (
                <form onSubmit={handleChangeUsername}>
                  <input
                    value={newUsername}
                    onChange={handleNewUserChange}
                    style={inputStyle}
                    placeholder="change username"
                  />
                </form>
              )}
              {usernameField && (
                <div style={{ marginBottom: '.75em' }}>
                  <button style={nestedButtonOk} onClick={handleChangeUsername}>
                    Enter
                  </button>
                  <button style={nestedButtonCancel} onClick={handleCUCancel}>
                    Cancel
                  </button>
                </div>
              )}
              <p style={textStyle}>
                Email: {userCred ? userCred[0].email : 'loading...'}
              </p>
              {!emailField && (
                <button style={changeButton} onClick={handleCEClick}>
                  change email
                </button>
              )}
              {emailField && (
                <form onSubmit={handleChangeEmail}>
                  <input
                    value={newEmail}
                    onChange={handleNewEmailChange}
                    style={inputStyle}
                    placeholder="change email"
                  />
                </form>
              )}
              {emailField && (
                <div style={{ marginBottom: '.75em' }}>
                  <button style={nestedButtonOk} onClick={handleChangeEmail}>
                    Enter
                  </button>
                  <button style={nestedButtonCancel} onClick={handleCECancel}>
                    Cancel
                  </button>
                </div>
              )}
              <button style={changePasswordButton} onClick={handleCPClick}>
                change password
              </button>
              <p style={timeStamp}>{createdAt()}</p>
            </div>
          )}

          <div style={settingsStyle}>
            <p style={textStyle}>Edit Stored Jumps</p>
            <button style={changeButton} onClick={handleERClick}>edit records</button>



            <p style={textStyle}>Home DZ {defaultDZ ? defaultDZ : 'none'}</p>
            {!dzField && (
              <button style={changeButton} onClick={handleDDF}>
                change Home DZ
              </button>
            )}
            {dzField && DZList}
            {dzField && (
              <form onSubmit={handleDZInput}>
                <input
                  style={inputStyle}
                  id="newDZ"
                  type="text"
                  placeholder="new DZ"
                  value={addJumpDZ}
                  onChange={handleAddJumpDZChange}
                />
                <button style={nestedButtonOk} onClick={handleDZInput}>
                  add
                </button>
                <button style={nestedButtonCancel} onClick={handleDZFCancel}>
                hide
              </button>
              </form>
            )}


            <p style={textStyle}>Default Rig {defaultRig ? defaultRig : 'none'}</p>
            {!rigField && (
              <button style={changeButton} onClick={handleDRF}>
                change default rig
              </button>
            )}
            {rigField && rigList}
            {rigField && (
              <form onSubmit={handleRigInput}>
                <input
                  style={inputStyle}
                  id="newRig"
                  type="text"
                  placeholder="new Rig"
                  value={addJumpRig}
                  onChange={handleAddJumpRigChange}
                />
                <button style={nestedButtonOk} onClick={handleRigInput}>
                  add
                </button>
                <button style={nestedButtonCancel} onClick={handleRFCancel}>
                  hide
                </button>
              </form>
            )}

            <p style={textStyle}>
              Default Aircraft {defaultAircraft ? defaultAircraft : 'none'}
            </p>
            {!aircraftField && (
              <button style={changeButton} onClick={handleDAF}>
                change default aircraft
              </button>
            )}
            {aircraftField && planeList}
            {aircraftField && (
              <form onSubmit={handleAircraftInput}>
                <input
                  style={inputStyle}
                  id="newAircraft"
                  type="text"
                  placeholder="new Aircraft"
                  value={addJumpAircraft}
                  onChange={handleAddJumpAircraftChange}
                />
                <button style={nestedButtonOk} onClick={handleAircraftInput}>
                  add
                </button><button style={nestedButtonCancel} onClick={handleAFCancel}>
                hide
              </button>
              </form>
            )}

          </div>

          <div style={feedbackStyle}>
            <p style={feedbackHeaderStyle}>Feedback / Bug Reporting</p>
            <textarea 
              style={inputStyle}
              placeholder={`your feedback, \n suggestion, \n or bug here`}
              rows={3}
              maxLength={255}
              onChange={(e) => {setFeedback(e.target.value)}}
              value={feedback}
            />
            <button type='button' style={submitButton} onClick={() => {handleFeedbackSubmit()}}>submit</button>
          </div>
        </>
      ) : (
        
         !editAJump ? <div style={{width: '100%', margin: "auto", display: "flex", flexFlow: "column", justifyContent: "center"}}>

            <div style={{width: "100%",display: "flex", justifyContent: "center", margin: "auto"}}>
               {!validateField ? 
               <button style={backButton} onClick={handleERCancel}>{backIcon}back</button>
            :
               <button style={backButton} onClick={handleDVCancel}>{backIcon}back</button>
            }
            </div>

            {jumpList ? <>
               {!validateField ? <>
                  <div style={{width: "60%",display: "flex", justifyContent: "space-between", margin: "auto"}}>
                     {jumps.length > 0 ? 
                     <>
                        <button onClick={handlePrevPage} style={pageButton}>prev</button>
                        <p style={textHeaderStyle}>page: {page + 1}</p>
                        <button onClick={handleNextPage} style={pageButton}>next</button>
                     </> : 
                     <div style={{width: "100%",display: "flex", justifyContent: "center", margin: "auto"}}>
                     <p style={textHeaderStyle}>No Jumps</p>
                     </div>}
                  </div>

                  {jumpList}

                  {jumps.length > 0 && <div style={{width: "60%",display: "flex", justifyContent: "space-between", margin: "auto"}}>
                     <button onClick={handlePrevPage} style={pageButton}>prev</button>
                     <p style={textHeaderStyle}>page: {page + 1}</p>
                     <button onClick={handleNextPage} style={pageButton}>next</button>
                  </div>}
               </> :
               <>

                  <div style={{width: "60%",display: "flex", margin: "auto", }}>
                     <p style={textStyle}>Enter Password to Delete Jump #{editedJump.jump_num}</p>
                  </div>

                  <form style={{width: "100%",display: "flex", justifyContent: "center", alignItems: "center" }} onSubmit={checkValidPasswordDel}>
                     <input 
                        style={inputStyle}
                        type="password"
                        placeholder="Enter Password"
                        value={validateValue}
                        onChange={handleChangeValidVal}
                     />
                     <div>
                        <button style={nestedButtonOk} onClick={checkValidPasswordDel}>enter</button>
                     </div>
                     
                  </form>
                  <JumpWidgetDel
                     jumpNum={editedJump.jump_num} 
                     jumpDate={editedJump.jump_date.slice(0,10)}
                     dz={editedJump.dz}
                     aircraft={editedJump.aircraft}
                     rig={editedJump.equipment}
                     exitAlt={editedJump.alt}
                     time={editedJump.t}
                     notes={editedJump.notes}
                  />

               </>
               }
            </>: 
            <div style={{width: "100%",display: "flex", justifyContent: "center", margin: "auto", alignItems: "center"}}>
                  <p style={textHeaderStyle}>loading...</p>
            </div>
            }
         </div>
         : 
         <div style={{width: '100%', margin: "auto", display: "flex", flexFlow: "column", justifyContent: "center"}}>
            <div style={{width: "100%",display: "flex", justifyContent: "center", margin: "auto", alignItems: "center"}}>
               <button style={backButton} onClick={handleEJCancel}>{backIcon}Back</button>
               <button style={returnButton} onClick={handleERCancel}>Return to Settings</button>
            </div>
            <EditJumpWidget 
               jumpNum={editedJump.jump_num} 
               jumpDate={editedJump.jump_date.slice(0,10)}
               dz={editedJump.dz}
               aircraft={editedJump.aircraft}
               rig={editedJump.equipment}
               exitAlt={editedJump.alt}
               time={editedJump.t}
               notes={editedJump.notes}
               rigList={Array.isArray(rigs) && rigs}
               dzList={Array.isArray(DZs) && DZs}
               planeList={Array.isArray(planes) && planes}
               jump_id={editedJump.jump_id}
               rst={() => {props.rst(); setPage(0); setEditAJump(false);}}
               set_false={() => props.set_false()}
            />
         </div>
      )}
    </div>
  </div> 
);

}

export default SettingsPage