const { dbFetchSuggestions } = require('../../database/PostgreSQL-Database/crudHelpers');

module.exports = {

  postgresFetch: (req, res) => {
    const  { id } = req.query;
    if (id) {
      dbFetchSuggestions(id)
        .then((data) => {
          console.log(data);
          res.status(200).send(data);
        })
        .catch((err) =>  {console.log(err); res.status(404).end(err)});
    } else {
      res.status(404).end('no id passed in')
    }
  },
  
}