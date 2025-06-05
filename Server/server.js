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

//upload jump route

app.post('/storejump', (req, res) => {
  const {
    user_id,
    jump_num,
    jump_date,
    dz,
    aircraft,
    equipment,
    alt,
    t,
    notes,
    pdfSig,
    tags  // an array of tag objects (each with name, cat, optional value)
  } = req.body;

  // 1) Insert into jumps, get back insertId as jump_id
  const insertJumpSql = `
    INSERT INTO jumps
      (user_id, jump_num, jump_date, dz, aircraft, equipment, alt, t, notes, pdfSig)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    insertJumpSql,
    [user_id, jump_num, jump_date, dz, aircraft, equipment, alt, t, notes, pdfSig],
    (jumpErr, jumpResult) => {
      if (jumpErr) {
        console.error('Error inserting jump:', jumpErr);
        return res.status(500).json({ message: 'Failed to store jump' });
      }

      const newJumpId = jumpResult.insertId; // this is the generated jump_id

      // 2) Now insert each tag, using newJumpId as jump_ref
      //    If no tags, just respond success
      if (!Array.isArray(tags) || tags.length === 0) {
        return res.status(200).json({ message: 'Jump stored with no tags'});
      }

      // Build a batch of INSERTs (you can also do them one by one)
      // Example: inserting tags one‐by‐one with error handling
      let completed = 0;
      let hasError = false;

      tags.forEach(tagObj => {
        // Only insert tags that actually exist in the array
        const { name, cat, value } = tagObj;

        // If value is undefined/null, set it to NULL in SQL
        const insertTagSql = value !== undefined
          ? 'INSERT INTO tags (name, cat, value, jump_ref) VALUES (?, ?, ?, ?)'
          : 'INSERT INTO tags (name, cat, jump_ref) VALUES (?, ?, ?)';

        const params = value !== undefined
          ? [name, cat, value, newJumpId]
          : [name, cat, newJumpId];

        db.query(insertTagSql, params, (tagErr) => {
          if (tagErr && !hasError) {
            hasError = true;
            console.error('Error inserting tag:', tagErr);
            alert(tagErr, "Abort / Continue?")
            // Once there's an error, you can decide to abort or continue.
            // Here, abort and return 500 to client.
            return res.status(500).json({ message: 'Failed to store tags' });
          }

          completed++;
          if (completed === tags.length && !hasError) {
            // All tags inserted successfully
            return res.status(200).json({
              message: 'Jump and tags stored successfully',
              jump_id: newJumpId
            });
          }
        });
      });
    }
  );
});





 app.listen(port, ()=> {
   console.log('listening')
 }); 

