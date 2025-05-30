const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto')


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

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return{hash, salt};
}

//register route

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const { hash,salt } = hashPassword(password);

  db.query(
    'INSERT INTO users (username, pasword, salt) VALUES (?, ?, ?)',
    [name, hash, salt],
    (err, result) => {
      if (err) return res.status(500).send('Registration failed');
      res.status(201).send('User registered');
    }
  );
});

//login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).send('Login error');
    if (results.length === 0) return res.status(401).send('User not found');

    const user = results[0];
    const { hash } = hashPassword(password, user.salt);
    if (hash !== user.password) return res.status(401).send('Invalid credentials');

    res.status(200).json({ message: 'Login successful', userId: user.id });
  });
});

 app.listen(port, ()=> {
   console.log('listening')
 });

