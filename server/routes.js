const router = require('express').Router();
const controllers = require('./controllers.js');

router
  .route('/suggestions')
  .get(controllers.mongoFetch);


//make a postgres controller handler

module.exports = router;
