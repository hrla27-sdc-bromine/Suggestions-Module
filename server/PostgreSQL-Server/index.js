//const nr = require('newrelic');
const { makeApp, app } = require('./app');



makeApp().then(() => {
  app.listen(3004, () => {
    console.log(`PostgreSQL server listening on port: ${3004}`);
  })
})


