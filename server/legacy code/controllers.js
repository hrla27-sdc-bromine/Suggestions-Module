const mongoProduct = require("../database/index.mongo.js");
const psqlPool = require('../../database/psql.index.js');

module.exports = {
	mongoFetch: (req, res) => {
		const { id } = req.query;
		if (id) {
			console.time('Fetch');
			mongoProduct.find({ id: id }, ['tags'])
			.then((product) => {
				let itemTags = product[0].tags;
				return mongoProduct.find({ tags: { $in: itemTags } }).limit(16);
			})
			.then((products) => {
				console.timeEnd('Fetch');
				res.status(200).send(products);
			})
			.catch((err) => { console.log(err); res.status(404).send(err) });
		}
	},

	postgresFetch: (req, res) => {
		const { id } = req.query;
		if (id) {
			console.time('Fetch');
			psqlPool.query('SELECT tagOne, tagTwo FROM products where id=$1',[id])
			.then(({ rows }) => {
				const { tagone, tagtwo } = rows[0];
				return [tagone, tagtwo];	
			})
			.then(([ tagone, tagtwo ]) => {
				psqlPool.query('SELECT * FROM products where tagone=$1 OR tagtwo=$2 limit 16',[tagone, tagtwo])
					.then(({ rows }) => {
						console.timeEnd('Fetch');
						res.status(200).send(rows);
					})
					.catch((err) => {
						res.status(404).send(err);
					})
			})
			.catch(err => {
				res.status(404).send(err)
			});
		}
	},

	postgresFetchOnce: (req, res) => {
		const { id } = req.query;
		if (id) {
			console.time('Fetch Once');
			psqlPool.query('SELECT * FROM products WHERE tagone=(SELECT tagone from products where id=$1) OR tagtwo=(SELECT tagtwo from products WHERE id=$1) LIMIT 16;', [id])
				.then(({ rows }) => {
					console.timeEnd('Fetch Once');
					res.status(200).send(rows);
				})
				.catch(err => res.status(404).send(err));
		}
	}
}
