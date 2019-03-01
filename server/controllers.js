const mongoProduct = require("../database/index.mongo.js");

module.exports = {
	mongoFetch: (req, res) => {
		const { id } = req.query;
		if (id) {
			mongoProduct.find({ id: id }, ['tags'])
			.then((product) => {
				let itemTags = product[0].tags;
				return mongoProduct.find({ tags: { $in: itemTags } }).limit(16);
			})
			.then((products) => {
				res.status(200).send(products);
			})
			.catch((err) => { console.log(err); res.status(404).send(err) });
		}
	}
}
