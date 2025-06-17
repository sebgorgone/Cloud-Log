import {useState, useEffect} from 'react';
import {getPallette} from "../logInputWidget";
import '../style/loginScreen.css';

function SettingsPage(props) {

   const pallette = getPallette();

   const user = props.user;


   //state

   const [userCred, setUserCred] = useState(null);

   function createdAt () {

      if (!userCred) return 'loading...';

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
      return `created ${diffDays} Day${diffDays !== 1 ? 's' : ''} ago '${monthName} ${createdDate.getDate()}, ${createdDate.getFullYear()}'`;
   }
  
   console.log('in the Settings page', userCred);

   //style

   const shell = {
      marginTop: "5em",
      marginLeft: "4.3em",
      paddingLeft: "1em",
      paddingBottom: "1em",
      background: pallette[2],
      textAlignLast: "center",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly"
   }

   const headerStyle = {
      width: "100%",
      fontFamily: "L1",
   }

   const settingsStyle = {
      display: "flex",
      flexFlow: "column",

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

            <div style={settingsStyle}>
               <input placeholder='name'></input>
               <input placeholder='email'></input>
               <input placeholder='password'></input>
               <p>{createdAt()}</p>
            </div>

            
         </div>
      </div>
   )

}

export default SettingsPage