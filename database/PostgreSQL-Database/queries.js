const path = require('path');

module.exports = {

  //query for fetching 16 products by id
  fetchSuggestions: 'SELECT * FROM products WHERE tagone=(SELECT tagone FROM products WHERE id=$1) OR tagtwo=(SELECT tagtwo FROM products WHERE id=$1) LIMIT 16;',

  //query for fetching 10 products to see if db exists
  getTen: 'SELECT * FROM products LIMIT 10;',

  //query for inserting a product into DB

  //query to update an existing product by id

  //query to delete an entry by id

  //query to set the sequencer after seeding the db
  setSequence: "SELECT setval('products_id_seq', (SELECT MAX(id) FROM \"products\"));",

  //query to copy the csv to the products table
  copyCSV: `COPY products FROM '${path.resolve(__dirname, '../../dataCSV.csv')}' DELIMITER ',' CSV HEADER;`,

  //make the products table if it exists
  createProductsTable: 'CREATE TABLE IF NOT EXISTS products ( id SERIAL PRIMARY KEY, title VARCHAR, price INTEGER, salePrice INTEGER, reviewStars FLOAT, reviewsTotal INTEGER, productPicture VARCHAR, tagOne VARCHAR, tagTwo VARCHAR, kind VARCHAR, specialTag VARCHAR);',

  //query strings to index the tables

}