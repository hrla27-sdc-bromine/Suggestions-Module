const { Pool } = require('pg');
const config = require('./poolConfig');
const queries = require('./queries');

//create a pool using the env variables from sever/index
const pgPool = new Pool(config);

//Export the db connection to be instantiated elsewhere
module.exports.initializeDbConnection = async () => {
  //Grab and client from the pool
  let client = await pgPool.connect().catch(err => console.log('err: ', err));
  console.log('DB connected on ', config.port);
  //Queries to create the tables if they dont exist
  await pgPool.query(queries.createProductsTable);

  //Queries to index the products table if they dont exist
  // await pgPool.query('***WRITE TEST INDEX QUERIES HERE***')

  //Release the client back to the pool
  return client.release();
};

//Export the pool clients to query the database in the crud helpers and seed the DB
module.exports.pgPool = pgPool;
