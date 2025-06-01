require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const multer  = require('multer');
const userSigUpload = multer({ storage: multer.memoryStorage() })



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

//Password Encryption

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return{hash, salt};
}

//register route

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const { hash,salt } = hashPassword(password);

  db.query(
    'INSERT INTO users (name, email, password, salt) VALUES (?, ?, ?, ?)',
    [name, email, hash, salt],
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

  if (hash !== user.password) {
    console.log("❌ Bad password for", identifier);
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const payload = { id: user.id, name: user.name, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

  console.log("✅ Logged in:", user.name);
  res.status(200).json({ message: 'Login successful', token , user: payload});
});
});

//get users rigs
app.post('/getrigs', (req, res) => {
  const { user_id } = req.body;

  db.query('SELECT name, id FROM rigs WHERE user_id=?',
    user_id,
    (err, results) => {
      if (err) {
        console.error('DB error fetching rig data for user', err);
        return res.status(500).json({message: 'could not retrieve rigs'});
      }
      if (results.length === 0) {
        console.log('no rigs found', results)
        return res.status(404).json({message: 'no rigs found'})
      }
      return res.status(200).json({message: 'got that rigs for ya', results})
    }
  )
});

//store users rigs
app.post('/storerigs', (req, res) => {
  const { user_id, name } = req.body;

  db.query('INSERT INTO rigs (name, user_id) VALUES (?, ?)',
    [name, user_id],
    (err, results) => {
      if (err) {
        console.error('DB error storing rig data', err);
        return res.status(500).json({message: 'could not store rig'});
      }
      return res.status(200).json({message: 'rigs in there!', results})
    }
  )
});

//get users planes
app.post('/getplanes', (req, res) => {
  const { user_id } = req.body;

  db.query('SELECT name, id FROM planes WHERE user_id=?',
    user_id,
    (err, results) => {
      if (err) {
        console.error('DB error fetching plane data for user', err);
        return res.status(500).json({message: 'could not retrieve planes'});
      }
      if (results.length === 0) {
        console.log('no planes found', results)
        return res.status(404).json({message: 'no planes found'})
      }
      return res.status(200).json({message: 'got that planes for ya', results})
    }
  )
});

//store user planes 
app.post('/storeplanes', (req, res) => {
  const { user_id, name } = req.body;

  db.query('INSERT INTO planes (name, user_id) VALUES (?, ?)',
    [name, user_id],
    (err, results) => {
      if (err) {
        console.error('DB error storing plane data', err);
        return res.status(500).json({message: 'could not store plane'});
      }
      return res.status(200).json({message: 'Your planes in there!', results})
    }
  )
});

// get DZ 
app.post('/getdzs', (req, res) => {
  const { user_id } = req.body;

  db.query('SELECT name, id FROM dropzones WHERE user_id=?',
    user_id,
    (err, results) => {
      if (err) {
        console.error('DB error fetching dropzone data for user', err);
        return res.status(500).json({message: 'could not retrieve DZs'});
      }
      if (results.length === 0) {
        console.log('no dropzones found', results)
        return res.status(404).json({message: 'no Dropzones found'})
      }
      return res.status(200).json({message: 'got that DZs for ya', results})
    }
  )
});

//store DZ
app.post('/storedz', (req, res) => {
  const { user_id, name } = req.body;

  db.query('INSERT INTO dropzones (name, user_id) VALUES (?, ?)',
    [name, user_id],
    (err, results) => {
      if (err) {
        console.error('DB error storing dropzones data', err);
        return res.status(500).json({message: 'could not store DZ'});
      }
      return res.status(200).json({message: 'Your dropzones in there!', results})
    }
  )
});

//upload signature
app.post(
  '/uploadsignature', 
  userSigUpload.single('pdfFile'),   // ← Multer will parse out one file from the "pdfFile" field
  (req, res) => {
    // at this point, `req.file` exists:
    // {
    //   fieldname: 'pdfFile',
    //   originalname: 'whatever.pdf',
    //   mimetype: 'application/pdf',
    //   buffer: <Buffer …>,
    //   size: 12345,
    //   …
    // }

    if (!req.file) {
      return res.status(400).json({ message: 'No PDF uploaded.' });
    }

    console.log('Received a PDF:', req.file.originalname);
    // If you just want to accept it and do nothing else, you could:
    //   • Save it to disk (fs.writeFile)
    //   • Stream it somewhere else
    //   • Return a success response without touching your MySQL at all

    // For example, to just acknowledge receipt:
    return res.status(200).json({
      message: 'PDF received on the server!',
      filename: req.file.originalname,
      size: req.file.size
    });
  }
);




 app.listen(port, ()=> {
   console.log('listening')
 }); 
