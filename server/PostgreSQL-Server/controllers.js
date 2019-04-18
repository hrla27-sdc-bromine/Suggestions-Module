const { dbFetchSuggestions } = require('../../database/PostgreSQL-Database/crudHelpers');

module.exports = {

  postgresFetch: (req, res) => {
    const  { id } = req.query;
    if (id) {
      let start = process.hrtime();
      dbFetchSuggestions(id)
        .then((data) => {
          let end = process.hrtime(start);
          console.log(end[1] / 1e6)
          res.status(200).send(data);
        })
        .catch((err) =>  {console.log(err); res.status(404).end(err)});
    } else {
      res.status(404).end('no id passed in')
    }
  },
  
}