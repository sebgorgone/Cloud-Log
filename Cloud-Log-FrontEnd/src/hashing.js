import crypto from 'crypto';
const [,, plainText] = process.argv;

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

if (!plainText) {
  console.log('Usage: node hashing.js <password>');
  process.exit(1);
}

const { hash, salt } = hashPassword(plainText);
console.log('');
console.log(`Hash: ${hash}`);
console.log('');
console.log(`Salt: ${salt}`);
console.log('');

//bash in src folder

// node hashing.js password