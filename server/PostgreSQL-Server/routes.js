const router = require('express').Router();
const controller = require('./controllers');

router
  .route('/suggestions')
  .get(controller.postgresFetch);

module.exports = router;
