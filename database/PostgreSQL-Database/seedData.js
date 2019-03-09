const fs = require('fs');
const path = require('path');
const queries = require('./queries');
const { pgPool } = require('./index');
const generateData = require('./generateData');

const seedData = async () => {
  
  console.log('checking db for entries...');

  //get the first ten rows to see if populated
  let { rows } = await pgPool.query(queries.getTen);

  if (rows.length === 0) {
    console.log('populating db...');

    //generate data
    await generateData();

    //query to copy the csv
    await pgPool.query(queries.copyCSV);

    //query to update the sequencer
    await pgPool.query(queries.setSequence)

    //delete the csv file
    console.log('deleting csv');
    fs.unlink(path.resolve(__dirname, '../../dataCSV.csv'), (err) => {
      if (err) console.error(err);
      console.log('path/file.txt was deleted');
    });
    console.log('csv deleted');
    ///Users/aqilt/Desktop/Suggestions-Module/database/PostgreSQL-Database/seedData.js
  } else {
    console.log('db is populated already...');
    
  }

  return 1;
};

module.exports = seedData;
