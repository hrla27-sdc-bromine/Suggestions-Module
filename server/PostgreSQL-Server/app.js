//express app
const express = require('express');
const app = express();

//initialize env variables
// const dotenv = require('dotenv');
// const variableExpansion = require('dotenv-expand');
// const myEnv = dotenv.config();
// variableExpansion(myEnv);

//startup functions
//const seed = require('../../database/PostgreSQL-Database/seedData');
const { initializeDbConnection } = require('../../database/PostgreSQL-Database/index')


//middleware
const path = require('path');
const cors = require('cors');
const parser = require('body-parser');
// const morgan = require('morgan');

//routes
const router = require('./routes');




/*
  this is the instantiation for the app server
  here the database needs to turn on
    and be seeded if empty
  then  
*/

module.exports.makeApp = async () => {

  await initializeDbConnection();

  // app.use(morgan('dev'));
  app.use(cors());
  app.use(parser.json());
  app.use(parser.urlencoded({ extended: true }));
  
  app.use(router);
  //remove static file serving for nowx
  //app.use(express.static(path.resolve(__dirname, '../../client/dist')));

};

module.exports.app = app;


