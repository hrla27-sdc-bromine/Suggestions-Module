const path = require('path');

module.exports = {

  fetchSuggestions: `
  SELECT * FROM products WHERE
    (SELECT tags FROM products WHERE id=$1)
    && tags 
    limit 16;
  `,

  // fetchSuggestions: `
  //   SELECT * FROM products WHERE 
  //   (SELECT tags FROM products WHERE id=$1)[1] = ANY (tags) 
  //   OR (SELECT tags FROM products WHERE id=$1)[2] = ANY (tags)
  //   limit 16;
  // `,
  //query for fetching 16 products by id
  // fetchSuggestions: `
  // WITH tags as (
  //   SELECT tagone 
  //     FROM products 
  //     WHERE id=$1 
  //     UNION
  //     SELECT tagtwo 
  //       FROM products 
  //       WHERE id=$1
  //   )SELECT * 
  //   FROM products 
  //   WHERE tagone in (SELECT * FROM tags)
  //     OR 
  //     tagtwo in (SELECT * FROM tags)
  //       LIMIT 16;
  // `,

  //cheating method
  fetchQuickSuggestions: `
    SELECT * FROM products WHERE tagone='mwndkbxval' or tagtwo='discnxunda' limit 16;
  `,

  //query for fetching 10 products to see if db exists
  getTen: 'SELECT * FROM products LIMIT 10;',

  //query for inserting a product into DB

  //query to update an existing product by id

  //query to delete an entry by id

  //query to set the sequencer after seeding the db
  setSequence: "SELECT setval('products_id_seq', (SELECT MAX(id) FROM \"products\"));",

  //query to copy the csv to the products table
  copyCSV: `\COPY products FROM '${path.resolve(__dirname, '../../dataCSV.csv')}' DELIMITER ',' CSV HEADER;`,
    //  \COPY products FROM '/Users/aqilt/Desktop/Suggestions-Module/newDataCSV.csv' DELIMITER ',' CSV HEADER;
  //make the products table if it exists
  createProductsTable: 'CREATE TABLE IF NOT EXISTS products ( id SERIAL PRIMARY KEY, title VARCHAR, price INTEGER, salePrice INTEGER, reviewStars FLOAT, reviewsTotal INTEGER, productPicture VARCHAR, tagOne VARCHAR, tagTwo VARCHAR, kind VARCHAR, specialTag VARCHAR);',

  //new create table for the products with array
  //createProductsTable: 'CREATE TABLE IF NOT EXISTS products ( id SERIAL PRIMARY KEY, title VARCHAR, price INTEGER, salePrice INTEGER, reviewStars FLOAT, reviewsTotal INTEGER, productPicture VARCHAR, tags varchar[], kind VARCHAR, specialTag VARCHAR);',

}