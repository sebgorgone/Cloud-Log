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
    'INSERT INTO users (name, email, password, salt) VALUES (?, ?, ?)',
    [name, hash, salt],
    (err, result) => {
      if (err) return res.status(500).json({message: 'Registration failed'});
      res.status(201).json({message: 'User registered'});
    }
  );
});

//login route
app.post('/login', (req, res) => {
  const { identifier, password } = req.body; // "identifier" = username OR email

  // Check if input is an email (simple regex)
  const isEmail = identifier.includes('@');

  const query = isEmail 
    ? 'SELECT * FROM users WHERE email = ?'
    : 'SELECT * FROM users WHERE name = ?';


console.log("Login attempt from:", identifier);

db.query(query, [identifier], (err, results) => {
  if (err) {
    console.error("DB error:", err);
    return res.status(500).json({ error: 'Login error' });
  }

  if (results.length === 0) {
    console.log("No user found for identifier:", identifier);
    return res.status(401).json({ error: 'User not found' });
  }

  const user = results[0];
  console.log("User retrieved:", user);

  const { hash } = hashPassword(password, user.salt);
  console.log("Hash comparison:", { enteredHash: hash, storedHash: user.password });

  if (hash !== user.password) {
    console.log("❌ Bad password for", identifier);
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  console.log("✅ Logged in:", user.name);
  res.status(200).json({ message: 'Login successful', userId: user.id });
});
});

 app.listen(port, ()=> {
   console.log('listening')
 });

