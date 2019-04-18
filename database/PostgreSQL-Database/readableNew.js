const data = require('../../dataGenerationHelpers.js');
const { Readable } = require('stream');

const limit = 1e7;
let count = 0;

const readableCSVGen = new Readable({
  read() {
    if (count === 0) this.push('id,title,price,salePrice,reviewStars,reviewsTotal,productPicture,tags,kind,specialTag\n');
    const salePriceAndTag = data.salePriceThenSpecialTag();
    const newProduct = {
      'id': count,
      'title': data.randomTitle(),
      'price': data.randomPrice(),
      'salePrice': salePriceAndTag[0],
      'reviewStars': data.randomStars(),
      'reviewsTotal': data.randomTotalReviews(),
      'productPicture': data.randomPictureLink(),
      'tags': `"{${data.randomTags().toString()}}"`, 
      'kind': data.randomKind(),
      'specialTag': salePriceAndTag[1]
    };
    const objString = Object.values(newProduct).join(',') + '\n';
    this.push(objString);
    count += 1;

    if (count % 1e6 === 0) console.log(`${count} docs created`);
    if (count === limit) this.push(null);
  }
})

module.exports = readableCSVGen;