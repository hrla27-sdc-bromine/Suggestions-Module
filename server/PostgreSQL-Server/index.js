const { makeApp, app } = require('./app');

console.log(process.env);

makeApp().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`PostgreSQL server listening on port: ${process.env.PORT}`);
  })
})

//this is the entry point of the entire app

//require the app and the app initialization

//use the app initialization promise to 
//  begin the listening of the app on a certain port
//  in the callback

