const Product = require("../database/index.mongo.js");

module.exports = {
	fetch: (req, res) => {
		const { id } = req.query;
		if (id) {
			Product.find({ id: id }, ['tags'])
			.then((product) => {
				let itemTags = product[0].tags;
				return Product.find({ tags: { $in: itemTags } });
			})
			.then((products) => {
				res.status(200).send(products);
			})
			.catch((err) => { console.log('err', err); res.status(404).send(err) });
		}
	}
}
