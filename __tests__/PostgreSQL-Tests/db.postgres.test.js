const { app, makeApp } = require('../../server/PostgreSQL-Server/app');
const { pgPool } = require('../../database/PostgreSQL-Database/index');
const queries = require('../../database/PostgreSQL-Database/queries');
const request = require('supertest');

describe('Test the server\'s APIs', () => {

  beforeAll( async () => {
    await makeApp();
  });

  // afterAll( async () => {
  //   await pgPool.end();
  // })

  test('It should get a response with a GET and ID of 10', async (done) => {
      let response = await request(app).get('/suggestions/?id=10');
      expect(response.status).toBe(200);
      done();
  });



});


describe('Run multiple queries for timings based on id', () => {

  //inititate server
  beforeAll( async () => {
    await makeApp();
  });

  //inititate db connection
  afterAll( async () => {
    await pgPool.end();
  });

  
  var baselineTime = [];
  it('Baseline postgres retrive 16 entries', async () => {
    //dont do any indexing and time getting back 100 x 16 retrievals
      for (var i = 0; i < 100; i++) {
        let start = process.hrtime();
        let id = (Math.floor(Math.random() * 1e7));
        await pgPool.query('SELECT tagOne, tagTwo FROM products where id=$1',[id])
          .then(({ rows }) => {
            let { tagone, tagtwo } = rows[0];
            return [tagone, tagtwo];         
          })
          .then(([tagone , tagtwo]) => {
            return pgPool.query('SELECT * FROM products where tagone=$1 OR tagtwo=$2 limit 16',[tagone, tagtwo])
          })
          .then(({ rows }) => {
            let end = process.hrtime(start);
            baselineTime.push(end[1] / 1e6);
            expect(rows.length).toBe(16);
          })
      }
      console.log(baselineTime.reduce((acc, num) => acc + num)/i);
    });
  
  var twoQueryBaseline = [];
  it('Baseline postgres compound query to retrieve 16 entries', async () => {
    //dont do any indexing and time getting back 100 x 16 retrievals
      for (var i = 0; i < 100; i++) {
        let start = process.hrtime();
        let id = (Math.floor(Math.random() * 1e7));
        await pgPool.query('SELECT * FROM products WHERE tagone=(SELECT tagone from products where id=$1) OR tagtwo=(SELECT tagtwo from products WHERE id=$1) LIMIT 16;', [id])
        .then(({ rows }) => {
          let end = process.hrtime(start);
          twoQueryBaseline.push(end[1] / 1e6);
          expect(rows.length).toBe(16);
        })
      }
      console.log(twoQueryBaseline.reduce((acc, num) => acc + num)/i);
    });
  
  // var twoQueryBaseline = [];
  // it('Baseline postgres compound query to retrive 16 entries', async () => {
  //   //dont do any indexing and time getting back 100 x 16 retrievals
  //     for (var i = 0; i < 100; i++) {
  //       let start = process.hrtime();
  //       let id = (Math.floor(Math.random() * 1e7));
  //       await pgPool.query('SELECT * FROM products WHERE tagone=(SELECT tagone from products where id=$1) OR tagtwo=(SELECT tagtwo from products WHERE id=$1) LIMIT 16;', [id])
  //       .then(({ rows }) => {
  //         let end = process.hrtime(start);
  //         twoQueryBaseline.push(end[1] / 1e6);
  //         expect(rows.length).toBe(16);
  //       })
  //     }
  //     console.log(twoQueryBaseline.reduce((acc, num) => acc + num)/i);
  //   });
    


});
