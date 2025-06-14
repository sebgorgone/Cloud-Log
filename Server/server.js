require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');




 const app = express();

 app.use(express.static(path.join(__dirname, "public")));
 app.use(cors());
 app.use(express.json({ limit: 
  '10mb' }));

 app.use(express.urlencoded({ limit: '10mb', extended: true }));

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

//get user jump history

app.post('/userjumphistory', (req, res) => {
  const { user_id } = req.body;

  db.query ('SELECT * FROM jumps WHERE user_id=? ORDER BY jump_num DESC',
    user_id,
    (err, results) => {
      if (err){
        console.error('DB error fetching user jump history', err);
        return res.status(500).json({message: 'could not retrieve user jumps'})
      }
      if (results.length === 0) {
        console.log('empty logbook', results);
        return res.status(201).json({message: 'empty log book', results, ok: true})
      }
      return res.status(200).json({message: 'loaded jumps', results, ok: true})
    }
  )
})

// get tags for multiple jumps
app.post('/gettags', async (req, res) => {
  const { jumpsIdArray } = req.body;
  if (!Array.isArray(jumpsIdArray) || jumpsIdArray.length === 0) {
    return res.status(400).json({ message: 'No jump IDs provided' });
  }
  try {
    const tagResults = await Promise.all(
      jumpsIdArray.map(id => new Promise((resolve, reject) => {
        db.query('SELECT name, cat, jump_ref  FROM tags WHERE jump_ref = ?', [id], (err, results) => {
          if (err) return reject(err);
          resolve({ jump_ref: id, tags: results });
        });
      }))
    );
    return res.status(200).json({ ok: true, results: tagResults });
  } catch (err) {
    console.error('Error fetching tags:', err);
    return res.status(500).json({ ok: false, error: err.message });
  }
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

app.post('/givebasket', (req, res) => {
  const { user_id } = req.body;

  db.query('INSERT INTO welcome_basket (user_id) VALUES (?)',
    user_id,
    (err, results) => {
      if (err) {
        console.error('DB error while giving basket data', err);
        return res.status(500).json({message: 'could not give basket'});
      }
      if(results.length === 0){
        return res.status(404).json({message: 'no basket yet'})
      }
      console.log('got basket for: ', results)
      return res.status(200).json({message: 'Success! basket succesfully given', results, ok: true})
    }
  )
});

app.post('/checkbasket', (req, res) => {
  const { user_id } = req.body;

  db.query('SELECT * from welcome_basket WHERE user_id=?',
    user_id,
    (err, results) => {
      if (err) {
        console.error('DB error finding basket data', err);
        return res.status(500).json({message: 'could not find basket'});
      }
      return res.status(200).json({message: 'Success! basket succesfully found', results})
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
    tags
  } = req.body;

  db.beginTransaction(err => {
    if (err) {
      console.error('Transaction begin error:', err);
      return res.status(500).json({ message: 'Failed to start transaction' });
    }

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
          return db.rollback(() => {
            res.status(500).json({ message: 'Failed to store jump' });
          });
        }

        const newJumpId = jumpResult.insertId;

        if (!Array.isArray(tags) || tags.length === 0) {
          return db.commit(commitErr => {
            if (commitErr) {
              console.error('Commit error:', commitErr);
              return db.rollback(() => {
                res.status(500).json({ message: 'Failed to commit transaction' });
              });
            }
            res.status(200).json({ 
              message: 'Jump stored with no tags',     
              jump_id: newJumpId,
              ok: true
             });
          });
        }

        let completed = 0;
        let hasError = false;

        tags.forEach(tagObj => {
          const { name, cat, value } = tagObj;
          const insertTagSql = value !== undefined
            ? 'INSERT INTO tags (user_id, name, cat, value, jump_ref) VALUES (?, ?, ?, ?, ?)'
            : 'INSERT INTO tags (user_id, name, cat, jump_ref) VALUES (?, ?, ?, ?)';
          const params = value !== undefined
            ? [user_id ,name, cat, value, newJumpId]
            : [user_id ,name, cat, newJumpId];

                      // Log before attempting to insert tag
          console.log('Attempting to insert tag for jump_id:', newJumpId, 'with params:', params);


          db.query(insertTagSql, params, tagErr => {
            if (tagErr && !hasError) {
              hasError = true;
              console.error('Error inserting tag:', tagErr);
              return db.rollback(() => {
                res.status(500).json({ message: 'Failed to store tags - Jump not catalouged',
                error: tagErr.message
                 });
                
              });
            }

            completed++;
            if (completed === tags.length && !hasError) {
              db.commit(commitErr => {
                if (commitErr) {
                  console.error('Commit error:', commitErr);
                  return db.rollback(() => {
                    res.status(500).json({ message: 'Failed to commit transaction' });
                  });
                }
                res.status(200).json({
                  message: 'Jump and tags stored successfully',
                  jump_id: newJumpId,
                  ok: true
                });
              });
            }
          });
        });
      }
    );
  });
});


//ask db if user exists

app.post('/askdbpos', (req, res) => {
  const { name, email } = req.body;

  db.query(
    `SELECT * FROM users 
     WHERE TRIM(LOWER(name)) = TRIM(LOWER(?)) 
     AND TRIM(LOWER(email)) = TRIM(LOWER(?))`,
    [name, email],
    (err, results) => {
      if (err) {
        console.error('DB error:', err);
        return res.status(500).json({ message: 'could not get user' });
      }

      console.log("found usermatch")
      if (results.length === 0) {
        return res.status(404).json({ message: 'no user found', ok: false });
      }

      return res.status(200).json({ message: 'user found', ok: true });
    }
  );
});

//search

app.post('/search', (req, res) => {
  const { wildCard: searchTerm, user_id, offset } = req.body;
  const term     = searchTerm.trim();
  const likeTerm = `%${term}%`;

  if (!user_id) {
    return res
      .status(400)
      .json({ message: 'user_id required' });
  }

  const sql = `
    SELECT DISTINCT
      j.jump_id, j.user_id, j.jump_num, j.jump_date,
      j.dz AS dropzone, j.equipment, j.notes, j.pdfSig, j.alt, j.t, j.aircraft
    FROM jumps AS j
    LEFT JOIN tags AS t
      ON j.jump_id = t.jump_ref
    WHERE j.user_id = ?
      AND (
        j.jump_num = CAST(? AS UNSIGNED)
        OR YEAR(j.jump_date) = CAST(? AS UNSIGNED)
        OR j.dz        LIKE ?
        OR j.equipment LIKE ?
        OR j.notes     LIKE ?
        OR t.name      LIKE ?
      )
    ORDER BY j.jump_num DESC
    LIMIT 30
    OFFSET ?;
  `;

  db.query(
    sql,
    [ user_id, term, term, likeTerm, likeTerm, likeTerm, likeTerm, offset ],
    (err, results) => {
      if (err) {
        console.error('DB error fetching search results', err);
        return res
          .status(500)
          .json({ message: 'could not retrieve search results' });
      }
      if (results.length === 0) {
        return res
          .status(200)
          .json({ message: 'no results', results, ok: true });
      }
      return res
        .status(200)
        .json({ message: 'loaded jumps', results, ok: true });
    }
  );
});

 app.listen(port, ()=> {
   console.log('listening')
 }); 

