const { pgPool } = require('./index');
const queries = require('./queries');

module.exports = {

  dbFetchSuggestions: (id) => {
    return pgPool.query(queries.fetchSuggestions, [id]).then(({ rows }) => rows );
  }

};
