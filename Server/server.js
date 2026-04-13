import dotenv from 'dotenv';
dotenv.config();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const creds = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  CORS_ORIGINS: process.env.CORS_ORIGINS.split(','),
};

let db = mysql.createPool({
  host: creds.DB_HOST,
  user: creds.DB_USER,
  password: creds.DB_PASSWORD,
  database: creds.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('MySQL connected successfully');
    connection.release();
  }
});

import express from 'express';
import mysql from 'mysql2';
import path from 'path';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import cors from 'cors';


const permittedTables = [
  'rigs',
  'planes',
  'dropzones',
];

 const app = express();
 app.use(express.json({ limit: 
  '10mb' }));

 app.use(express.urlencoded({ limit: '10mb', extended: true }));

// app.use(cors({
//   origin: 'https://main.dmade3q40chsh.amplifyapp.com',
//   credentials: true
// }));
app.use(cors({
  origin: ['http://localhost:5173', 'http://192.168.1.243:5174', 'http:192.168.1.243:5173'],
  credentials: true
}));
// app.options('*', cors({
//   origin: 'https://main.dmade3q40chsh.amplifyapp.com',
//   credentials: true
// }));
app.options('*', cors({
  origin: ['http://localhost:5173', 'http://192.168.1.243:5174', 'http://192.168.1.243:5173'],
  credentials: true
}));

app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
      ],
      imgSrc: ["'self'", 'data:'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      connectSrc: ["'self'", 'https://vwimoat905.execute-api.us-east-1.amazonaws.com'], 
      frameAncestors: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

app.use(helmet.frameguard({ action: 'deny' }));

app.use(helmet.noSniff());

app.use(
  helmet.hsts({
    maxAge: 90 * 24 * 60 * 60, // 90 days in seconds
    includeSubDomains: true,   // apply to subdomains too
    preload: true,
  })
);

app.use(
  helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' })
);

app.disable('x-powered-by');

// Health check endpoint for load balancers / uptime monitors
app.get('/healthz', (req, res) => {
  if (!db) {
    return res.status(500).json({ status: 'fail', db: 'not_initialized' });
  }
  db.getConnection((err, conn) => {
    if (err) {
      console.error('Health check DB connection failed:', err);
      return res.status(500).json({ status: 'fail', db: 'down' });
    }
    conn.ping(pingErr => {
      conn.release();
      if (pingErr) {
        console.error('Health check DB ping failed:', pingErr);
        return res.status(500).json({ status: 'fail', db: 'down' });
      }
      res.status(200).json({ status: 'ok', db: 'up' });
    });
  });
});

//Password Encryption

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return{hash, salt};
}

//register route

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  db.query(
    'SELECT id FROM users WHERE name = ? OR email = ?',
    [name, email],
    (checkErr, checkResults) => {
      if (checkErr) {
        console.error('DB error checking existing user:', checkErr);
        return res.status(500).json({
          message: 'Internal server error',
          error: 'db_error'
        });
      }
      if (checkResults.length > 0) {
        return res.status(409).json({
          message: 'User or email already exists',
          error: 'user_or_email_exists'
        });
      }

      const { hash, salt } = hashPassword(password);

      db.query(
        'INSERT INTO users (name, email, password, salt) VALUES (?, ?, ?, ?)',
        [name, email, hash, salt],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error('DB error inserting new user:', insertErr);
            return res.status(500).json({
              message: 'Registration failed',
              error: 'insert_error'
            });
          }
          res.status(201).json({
            message: 'User registered'
          });
        }
      );
    }
  );
});

//change password

app.post('/changepassword', (req, res) => {
  const { id, password } = req.body;
  const { hash,salt } = hashPassword(password);

  db.query(
    'UPDATE users SET password=?, salt=? WHERE id=?',
    [hash, salt, id],
    (err, result) => {
      if (err) return res.status(500).json({message: 'password change failed'});
      console.log('succesfully set new user password');
      res.status(201).json({message: 'User password changed', ok: true});
      
    }
  );
});

//change username

app.post('/changeusername', (req, res) => {
  const { name, id } = req.body;

  db.query(
    'SELECT id FROM users WHERE name = ?',
    [name],
    (checkErr, checkResults) => {
      if (checkErr) {
        console.error('DB error checking existing user:', checkErr);
        return res.status(500).json({
          message: 'Internal server error',
          error: 'db_error'
        });
      }
      if (checkResults.length > 0) {
        return res.status(409).json({
          message: 'Username already exists',
          error: 'user_name_already_exists'
        });
      }

      db.query(
        'UPDATE users SET name=? WHERE id=?',
        [name, id],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error('DB error creating new username:', insertErr);
            return res.status(500).json({
              message: 'Username change failed',
              error: 'change_error'
            });
          }
          res.status(201).json({
            message: 'Username changed'
          });
        }
      );
    }
  );
});

//change email
app.post('/changeemail', (req, res) => {
  const { email, id } = req.body;

  db.query(
    'SELECT id FROM users WHERE email = ?',
    [email],
    (checkErr, checkResults) => {
      if (checkErr) {
        console.error('DB error checking existing email:', checkErr);
        return res.status(500).json({
          message: 'Internal server error',
          error: 'db_error'
        });
      }
      if (checkResults.length > 0) {
        return res.status(409).json({
          message: 'Email already exists',
          error: 'email_already_exists'
        });
      }

      db.query(
        'UPDATE users SET email=? WHERE id=?',
        [email, id],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error('DB error creating new email:', insertErr);
            return res.status(500).json({
              message: 'Email change failed',
              error: 'change_error'
            });
          }
          res.status(201).json({
            message: 'Email changed'
          });
        }
      );
    }
  );
});

//login route
app.post('/login', (req, res) => {
  const { identifier, password } = req.body;
  const isEmail = identifier.includes('@');

  console.log("🔐 Login attempt with identifier:", identifier);

  const query = isEmail 
    ? 'SELECT * FROM users WHERE email = ?'
    : 'SELECT * FROM users WHERE name = ?';

  db.query(query, [identifier], (err, results) => {
    if (err) {
      console.error("❌ DB error during login:", err);
      return res.status(500).json({ error: 'Login error' });
    }

    console.log("📦 Query results:", results);

    if (results.length === 0) {
      console.warn('⚠️ Login failed — no user record found for identifier:', identifier);
      return res.status(401).json({ error: 'User not found', code: 'USER_NOT_FOUND' });
    }

    const user = results[0];
    const { hash } = hashPassword(password, user.salt);

    if (hash !== user.password) {
      console.warn("🚫 Login failed — invalid password for identifier:", identifier);
      return res.status(401).json({ error: 'Invalid credentials', code: 'INVALID_PASSWORD' });
    }

    const payload = { id: user.id, name: user.name, email: user.email };
    const token = jwt.sign(payload, creds.JWT_SECRET, { expiresIn: '30m' });

    res.status(200).json({ message: 'Login successful', token, user: payload });
  });
});

//validate password

app.post('/validate', (req, res) => {
  const { id, password } = req.body;

  const query = 'SELECT * FROM users WHERE id=?'


console.log("validation attempt from:", id);

db.query(query, id, (err, results) => {
  if (err) {
    console.error("DB error:", err);
    return res.status(500).json({ error: 'validation error' });
  }

  if (results.length === 0) {
    console.log("No user found for user_ID:", id);
    return res.status(401).json({ error: 'User not found' });
  }

  const user = results[0];

  const { hash } = hashPassword(password, user.salt);

  if (hash !== user.password) {
    console.log("❌ Bad password for", id);
    return res.status(401).json({ error: 'Invalid credentials', ok: false });
  }

  console.log("✅ user validated:", user.name);
  res.status(200).json({ message: 'User validated', ok: true});
});
});

//get user jump history

app.post('/userjumphistory', (req, res) => {
  const { user_id } = req.body;


  console.log('getting user jump history')

  db.query ('SELECT jump_id, jump_num, jump_date, dz, aircraft, equipment, alt, t, notes, created_at FROM jumps WHERE user_id=? ORDER BY jump_num DESC',
    user_id,
    (err, results) => {
      if (err){
        console.error('DB error fetching user jump history');
        return res.status(500).json({message: 'could not retrieve user jumps'})
      }
      if (results.length === 0) {
        console.log('empty logbook', results);
        return res.status(201).json({message: 'empty log book', results, ok: true})
      }
      return res.status(200).json({message: 'loaded jumps', results, ok: true})
    }
  )
});

//sig from JID

app.post('/signature', (req, res) => {
  const { jump_id } = req.body;

  db.query ('SELECT pdfSig FROM jumps WHERE jump_id=?',
    jump_id,
    (err, results) => {
      if (err){
        console.error('DB error fetching this pdf',);
        return res.status(500).json({message: 'could not retrieve users pdf'})
      }
      if (results.length === 0) {
        console.log('no signatre found', results);
        return res.status(201).json({message: 'Signature not found', results, ok: true})
      }
      return res.status(200).json({message: 'signature retrieved', results, ok: true})
    }
  )
});



//get all tags

app.post('/getalltags', (req, res) => {
  const { user_id } = req.body;

  db.query ('SELECT name, cat FROM tags WHERE user_id=?',
    user_id,
    (err, results) => {
      if (err){
        console.error('DB error fetching all user tags');
        return res.status(500).json({message: 'could not retrieve user tags'})
      }
      if (results.length === 0) {
        console.log('empty logbook', results);
        return res.status(201).json({message: 'no tags', results, ok: true})
      }
      return res.status(200).json({message: 'loaded tags', results, ok: true})
    }
  )
});

//get user info
app.post('/user', (req, res) => {
  const { user_id } = req.body;

  db.query ('SELECT email, created_at FROM users WHERE id=?',
    user_id,
    (err, results) => {
      if (err){
        console.error('DB error fetching user cred', err);
        return res.status(500).json({message: 'could not retrieve user data'})
      }
      return res.status(200).json({message: 'retieved user', results, ok: true})
    }
  )
});

//get tags for all jumps
app.post('/gettags', (req, res) => {
  const { jumpsIdArray } = req.body;
  if (!Array.isArray(jumpsIdArray) || jumpsIdArray.length === 0) {
    return res.status(400).json({ message: 'No jump IDs provided' });
  }

  const placeholders = jumpsIdArray.map(() => '?').join(',');
  const sql = `
    SELECT name, cat, jump_ref 
      FROM tags 
     WHERE jump_ref IN (${placeholders})
  `;
  db.query(sql, jumpsIdArray, (err, rows) => {
    if (err) {
      console.error('Error fetching tags:', err);
      return res.status(500).json({ ok: false });
    }
    const grouped = {};
    for (const row of rows) {
      if (!grouped[row.jump_ref]) grouped[row.jump_ref] = [];
      grouped[row.jump_ref].push({ name: row.name, cat: row.cat });
    }
    const results = jumpsIdArray.map(id => ({
      jump_ref: id,
      tags: grouped[id] || []
    }));
    res.status(200).json({ ok: true, results });
  });
});

//get user defaults 
app.post('/getdefaults', (req, res) => {
  const { user_id } = req.body;

  db.query('SELECT rig, dz, aircraft FROM presets WHERE user_id=?',
    user_id,
    (err, results) => {
      if (err) {
        console.error('DB error fetching defaults for user', err);
        return res.status(500).json({message: 'could not retrieve defaults'});
      }
      if (results.length === 0) {
        console.log('no defaults found', results)
        return res.status(404).json({message: 'no rigs found'})
      }
      return res.status(200).json({message: 'got that defaults for ya', results})
    }
  )
});

//get complete user info

app.post('/getuserinfo', (req, res) => {
  const { user_id } = req.body;

  const sql = `
    SELECT
      p.rig,
      p.dz,
      p.aircraft,

      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', r.id, 'name', r.name))
        FROM rigs r
        WHERE r.user_id = p.user_id
      ) AS rigs,

      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', pl.id, 'name', pl.name))
        FROM planes pl
        WHERE pl.user_id = p.user_id
      ) AS planes,

      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', dz.id, 'name', dz.name))
        FROM dropzones dz
        WHERE dz.user_id = p.user_id
      ) AS dropzones

    FROM presets p
    WHERE p.user_id = ?
    LIMIT 1;
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error('DB error fetching full user info:', err);
      return res.status(500).json({ message: 'could not retrieve user info' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'no user presets found' });
    }

    // you're good — respond with the unified object
    return res.status(200).json({
      message: 'full user info retrieved',
      ...results[0]
    });
  });
});

//upload feedback

app.post('/feedback', (req, res) => {
  const { user_id, message } = req.body;

  db.query('INSERT INTO feedback (message, user_id) VALUES (?, ?)',
    [message, user_id],
    (err, results) => {
      if (err) {
        console.error('DB error uploading feedback', err);
        return res.status(500).json({message: 'could not send feedback'});
      }
      return res.status(200).json({message: 'feedback sent!', results})
    }
  )
});

//store default rig

app.post('/storedefaultrig', (req, res) => {
  const { user_id, rig } = req.body;

  db.query('UPDATE presets SET rig=? WHERE user_id=?',
    [rig, user_id],
    (err, results) => {
      if (err) {
        console.error('DB error storing default', err);
        return res.status(500).json({message: 'could not store default rig'});
      }
      return res.status(200).json({message: 'defaults in there!', results})
    }
  )
});

//store default dz

app.post('/storedefaultdz', (req, res) => {
  const { user_id, dz } = req.body;

  db.query('UPDATE presets SET dz=? WHERE user_id=?',
    [dz, user_id],
    (err, results) => {
      if (err) {
        console.error('DB error storing default');
        return res.status(500).json({message: 'could not store default'});
      }
      return res.status(200).json({message: 'defaults in there!', results})
    }
  )
});

//store default aircraft
app.post('/storedefaultaircraft', (req, res) => {
  const { user_id, aircraft } = req.body;

  db.query('UPDATE presets SET aircraft=? WHERE user_id=?',
    [aircraft, user_id],
    (err, results) => {
      if (err) {
        console.error('DB error storing default');
        return res.status(500).json({message: 'could not store default'});
      }
      return res.status(200).json({message: 'defaults in there!', results})
    }
  )
});

//get users rigs
app.post('/getrigs', (req, res) => {
  const { user_id } = req.body;

  db.query('SELECT name, id FROM rigs WHERE user_id=?',
    user_id,
    (err, results) => {
      if (err) {
        console.error('DB error fetching rig data for user');
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
        console.error('DB error storing rig data');
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
        console.error('DB error fetching plane data for user');
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
        console.error('DB error storing plane data');
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
        console.error('DB error fetching dropzone data for user');
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
        console.error('DB error storing dropzones data');
        return res.status(500).json({message: 'could not store DZ'});
      }
      return res.status(200).json({message: 'Your dropzones in there!', results})
    }
  )
});

app.post('/givebasket', (req, res) => {
  const { user_id } = req.body;

  db.query(
    'INSERT INTO welcome_basket (user_id) VALUES (?)',
    [user_id],
    (err, result) => {
      if (err) {
        // Handle duplicate entry (already has a basket)
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({
            error: 'BASKET_EXISTS',
            message: 'Basket already given for this user'
          });
        }
        console.error('DB error while giving basket data:', err);
        return res.status(500).json({
          error: 'DB_ERROR',
          message: 'Could not create basket'
        });
      }

      // Confirm insert happened
      if (result.affectedRows === 0) {
        return res.status(400).json({
          error: 'INSERT_FAILED',
          message: 'Failed to create basket'
        });

      if (results.affectedRows === 1) {
        return res.status(200).json({
          message: 'Basket Given',
          ok: true
        })
      }
      }
    }
  );
});

app.post('/checkbasket', (req, res) => {
  const { user_id } = req.body;

  db.query('SELECT * from welcome_basket WHERE user_id=?',
    user_id,
    (err, results) => {
      if (err) {
        console.error('DB error finding basket data');
        return res.status(500).json({message: 'could not find basket'});
      }
      return res.status(200).json({message: 'Success! basket succesfully found', results})
    }
  )
});

//upload jump route

app.post('/storejump', (req, res) => {
  const {
    user_id, jump_num, jump_date,
    dz, aircraft, equipment,
    alt, t, notes, pdfSig, tags
  } = req.body;

  // 1) Grab a connection from the pool
  db.getConnection((connErr, conn) => {
    if (connErr) {
      console.error('Pool connection error:', connErr);
      return res.status(500).json({ message: 'DB connection failed' });
    }

    // 2) Begin a transaction on that connection
    conn.beginTransaction(err => {
      if (err) {
        conn.release();
        console.error('Transaction begin error:', err);
        return res.status(500).json({ message: 'Failed to start transaction' });
      }

      const insertJumpSql = `
        INSERT INTO jumps
          (user_id, jump_num, jump_date, dz, aircraft, equipment, alt, t, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      conn.query(
        insertJumpSql,
        [user_id, jump_num, jump_date, dz, aircraft, equipment, alt, t, notes],
        (jumpErr, jumpResult) => {
          if (jumpErr) {
            return conn.rollback(() => {
              conn.release();
              console.error('Error inserting jump:', jumpErr);
              res.status(500).json({ message: 'Failed to store jump' });
            });
          }

          const newJumpId = jumpResult.insertId;

          // If no tags, commit immediately
          // After you’ve inserted the jump and have newJumpId…
if (Array.isArray(tags) && tags.length > 0) {
  // Build a 2D array of values: [ [user_id, name, cat, value, newJumpId], … ]
  const values = tags.map(t => [
    user_id,
    t.name,
    t.cat,
    t.value != null ? t.value : null,
    newJumpId
  ]);

  const insertTagsSql = `
    INSERT INTO tags
      (user_id, name, cat, value, jump_ref)
    VALUES ?
  `;

  conn.query(insertTagsSql, [values], (bulkErr, bulkResult) => {
    if (bulkErr) {
      return conn.rollback(() => {
        conn.release();
        console.error('Error bulk inserting tags:', bulkErr);
        return res.status(500).json({
          message: 'Failed to store tags – Jump not catalogued'
        });
      });
    }
    // Commit once, after the bulk insert
    conn.commit(commitErr => {
      conn.release();
      if (commitErr) {
        console.error('Commit error:', commitErr);
        return res.status(500).json({ message: 'Commit failed' });
      }
      res.status(200).json({
        message: 'Jump and tags stored successfully',
        jump_id: newJumpId,
        ok: true
      });
    });
  });
} else { 
  conn.commit(commitErr => {
      conn.release();
      if (commitErr) {
        console.error('Commit error for no tags:', commitErr);
        return res.status(500).json({ message: 'Failed to commit jump' });
      }
      res.status(200).json({
        message: 'Jump stored with no tags',
        jump_id: newJumpId,
        ok: true
      });
    });
}
        }
      );
    });
  });
});

//edit jump route
app.post('/editjump', (req, res) => {
  const {
    jump_id,
    jump_num,
    jump_date,
    dz,
    aircraft,
    equipment,
    alt,
    t,
    notes,
  } = req.body;

  db.query(
    `UPDATE jumps SET
       jump_num   = ?,
       jump_date  = ?,
       dz         = ?,
       aircraft   = ?,
       equipment  = ?,
       alt        = ?,
       t          = ?,
       notes      = ?
     WHERE jump_id   = ?`,
    [jump_num, jump_date, dz, aircraft, equipment, alt, t, notes, jump_id],
    (err, result) => {
      if (err) {
        console.error('Error updating jump:');
        return res.status(500).json({
          message: 'Update failed',
          error: err.code || err.message
        });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({
          error: 'JUMP_NOT_FOUND',
          message: 'No jump found'
        });
      }
      res.status(200).json({
        message: 'Updated jump successfully',
        result,
        ok: true,
      });
    }
  );
});

//delete jump 
app.post('/deletejump', (req, res) => {
  const {jump_id} = req.body;
  db.query(
    `DELETE FROM jumps WHERE jump_id=?`,
    [jump_id],
    (err, result) => {
      if (err) {
        console.error('Error deleting jump:', err);
        return res.status(500).json({
          message: 'delete failed',
          error: 'FAILED_DELETE'
        });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({
          error: 'JUMP_NOT_FOUND',
          message: 'No jump found',
        });
      }
      res.status(200).json({
        message: 'deleted jump successfully',
        result,
        ok: true,
      });
    }
  );
});

//delete from associated table 

app.post('/deleteft', (req, res) => {
  const { value, table, user_id} = req.body;

  if (!permittedTables.includes(table)) {
    return res.status(400).json({
      error: 'INVALID_TABLE',
      message: `You cannot delete from table.`
  });
  }
  db.query(
    `DELETE FROM ?? WHERE user_id=? AND name=?`,
    [table, user_id, value],
    (err, result) => {
      if (err) {
        console.error(`error deleting`);
        return res.status(500).json({
          message: 'delete failed',
          error: err.code || err.message
        });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({
          error: 'NOT_FOUND',
          message: `No values found`
        });
      }
      res.status(200).json({
        message: 'deleted successfully',
        result,
        ok: true,
      });
    }
  );
});

//delete rig-plane-dz

app.post('/validatedelete', (req, res) => {
  const {value, field} = req.body;
  console.log(`validating ${field}-- value: ${value}`)
  db.query(
    `SELECT jump_num FROM jumps WHERE ${field}=?`,
    [value],
    (err, result) => {
      if (err) {
        console.error('Error validating passed jumps:');
        return res.status(500).json({
          message: 'validation failed',
          result,
          error: 'INVALID_DELETE'
        });
      }
      if (result.length > 0) {
        console.log('invalid jump', result);
        return res.status(409).json({
          ok: false,
          message: `is stored with jumps`,
          result  
        });
      }
      console.log('invalid jump', result)
      res.status(204).json({
        message: `valid delete`,
      });
    }
  );
});

//ask db if user exists

app.post('/askdbpos', (req, res) => {
  const { name, email } = req.body;

  db.query(
    `SELECT * FROM users
     WHERE TRIM(LOWER(name))  = TRIM(LOWER(?))
       AND TRIM(LOWER(email)) = TRIM(LOWER(?))`,
    [name, email],
    (err, results) => {
      if (err) {
        console.error('DB error:');
        return res.status(500).json({ message: 'could not get user' });
      }
      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: 'no user found', ok: false });
      }

      const userId = results[0].id;

      db.query(
        'INSERT INTO presets (user_id) VALUES (?)',
        [userId],
        (defErr, defResults) => {
          if (defErr) {
            console.error('DB error creating defaults:', defErr);
            return res
              .status(500)
              .json({ message: 'could not make defaults' });
          }

          return res
            .status(201)
            .json({
              message: 'successfully created user defaults',
              ok: true
            });
        }
      );
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
        console.error('DB error fetching search results');
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// export const handler = serverless(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
