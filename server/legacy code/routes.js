const router = require('express').Router();
const controllers = require('./controllers.js');

router
  .route('/suggestions')
  // .get(controllers.mongoFetch);
  .get(controllers.postgresFetch);
  // .get(controllers.postgresFetchOnce);


//make a postgres controller handler

module.exports = router;
