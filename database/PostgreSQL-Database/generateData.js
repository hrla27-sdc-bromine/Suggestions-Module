const fs = require('fs');
const readable = require('./readableNew');

const generateData = () => {
  const dataCSV = fs.createWriteStream('./newDataCSV.csv');
  const write  = readable.pipe(dataCSV);
  return new Promise((resolve, reject) => {
    write.on('finish', resolve);
    write.on('error', reject);
  });
};

generateData();

module.exports = generateData;
