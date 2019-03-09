const fs = require('fs');
const readable = require('./readable');

const generateData = () => {
  const dataCSV = fs.createWriteStream('./dataCSV.csv');
  const write  = readable.pipe(dataCSV);
  return new Promise((resolve, reject) => {
    write.on('finish', resolve);
    write.on('error', reject);
  });
};

module.exports = generateData;
