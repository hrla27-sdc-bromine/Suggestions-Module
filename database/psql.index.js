const { Pool } = require('pg');

const pool = new Pool({
  // user: 'aqilt',
  // // password: 'password',
  // host: 'localhost',
  // port: 5432,
  // database: 'suggestions',
});

pool.connect()
  .then(() => console.log('pool is connected on 5432'))
  .catch(err => console.log('err', err));

module.exports = pool;