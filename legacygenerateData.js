const fs = require('fs');
const { Readable } = require('stream');
const data = require('./dataGenerationHelpers');

let limit = 1e7;
let count = 0;

// const readableStream = new Readable({
//   read() {
//     if (count === 0) this.push(`[\n`);
//     const salePriceAndTag = data.salePriceThenSpecialTag();
//     const newProduct = {
//       'id': count,
//       'title': data.randomTitle(),
//       'price': data.randomPrice(),
//       'salePrice': salePriceAndTag[0],
//       'reviewStars': data.randomStars(),
//       'reviewsTotal': data.randomTotalReviews(),
//       'productPicture': data.randomPictureLink(),
//       'tags': data.randomTags(), 
//       'kind': data.randomKind(),
//       'specialTag': salePriceAndTag[1]
//     };

//     this.push(JSON.stringify(newProduct));
//     if (count < limit - 1) this.push(',');
//     this.push(`\n`);
//     count++;
//     if (count % 1e6 === 0) console.log(`${count} documents created`);
//     if (count === limit) {
//       this.push(']');
//       this.push(null);
//     }

//   }
// })

// let dataFile = fs.createWriteStream('./bigData.json');

// readableStream.pipe(dataFile);


const readableCSVGen = new Readable({
  read() {
    if (count === 0) this.push('id,title,price,salePrice,reviewStars,reviewsTotal,productPicture,tagOne,tagTwo,kind,specialTag\n');
    const salePriceAndTag = data.salePriceThenSpecialTag();
    const newProduct = {
      'id': count,
      'title': data.randomTitle(),
      'price': data.randomPrice(),
      'salePrice': salePriceAndTag[0],
      'reviewStars': data.randomStars(),
      'reviewsTotal': data.randomTotalReviews(),
      'productPicture': data.randomPictureLink(),
      'tagOne': `"${data.randomTags()[0]}"`, 
      'tagTwo': `"${data.randomTags()[1]}"`, 
      'kind': data.randomKind(),
      'specialTag': salePriceAndTag[1]
    };
    const objString = Object.values(newProduct).join(',') + '\n';
    this.push(objString);
    count += 1;
    console.log(`${count} docs created`);
    if (count === limit) this.push(null);
  }
})

let dataCSV = fs.createWriteStream('./dataCSV.csv');

readableCSVGen.pipe(dataCSV);
