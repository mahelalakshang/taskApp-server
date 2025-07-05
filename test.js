const bcrypt = require('bcrypt');

const rawPassword = 'Mahela2'; // The password you're trying during login
const hashFromMongo =
  '$2b$10$X1QAwbPgVZTgPcplURfyFuraygYMz0FlKKlPeJIPlpRnTFwSKPkHW';

bcrypt.compare(rawPassword, hashFromMongo).then(console.log);
