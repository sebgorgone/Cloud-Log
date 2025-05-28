const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');


 const app = express();

 app.use(express.static(path.join(__dirname, "public")));
 app.use(cors()); 
 app.use(express.json());

 const port = 5009;

 const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "cloudLog"
 });

 db.connect(err => {
  if (err) {
    console.error('MySQL connection failed: ', err);
    return;
  }
  console.log('✅ MySQL connected');
});



 app.listen(port, ()=> {
   console.log('listening')
 });