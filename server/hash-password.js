const bcrypt = require('bcryptjs');
const password = 'test123'; // Change as needed
bcrypt.hash(password, 10, (err, hash) => {
  if (err) console.error(err);
  console.log('Hashed password:', hash);
});