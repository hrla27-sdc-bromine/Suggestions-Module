const fs = require('fs');
const { Readable } = require('stream');
const data = require('./dataGenerationHelpers');

let limit = 100;
let count = 0;

const readableStream = new Readable({
  read() {
    if (count === 0) this.push(`[\n`);
    const salePriceAndTag = data.salePriceThenSpecialTag();
    const newProduct = {
      'id': count,
      'title': data.randomTitle(),
      'price': data.randomPrice(),
      'salePrice': salePriceAndTag[0],
      'reviewStars': data.randomStars(),
      'reviewsTotal': data.randomTotalReviews(),
      'productPicture': data.randomPictureLink(),
      'tags': data.randomTags(), 
      'kind': data.randomKind(),
      'specialTag': salePriceAndTag[1]
    };

    this.push(JSON.stringify(newProduct));
    if (count < limit - 1) this.push(',');
    this.push(`\n`);
    count++;
    console.log(`${count} documents created`);
    if (count === limit) {
      this.push(']');
      this.push(null);
    }

  }
})

let dataFile = fs.createWriteStream('./data.json');

readableStream.pipe(dataFile);
