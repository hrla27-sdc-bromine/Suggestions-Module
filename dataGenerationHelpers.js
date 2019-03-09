const chance = require('chance')();
const _ = require('lodash');

function createRandomWords(limit) {
  const randomWords = [];
  for (let i = 0; i < limit; i += 1) {
    randomWords.push(chance.string({ length: 10, pool: 'qwertyuiopasdfghjklzxcvbnm' }));
  }
  return randomWords;
};

const title = ['Running Shoes', 'AirMax Shoes', 'Edgebounce Shoes', 'Life Shoes', 'Fanny Pack Elite', 'Ultra Boost Shoes', 'Big Bolla Joggas', 'Slav Squat', 'Track Suit TM'];
const kinds = ['Original' , 'Essentials', 'Performance'];
const tags = createRandomWords(2000);

//console.log('title ', title.length, 'tags ', tags.length, 'kinds ', kinds.length);

const randomTitle = () => {
  return title[Math.floor(Math.random() * title.length)];
};

const randomTags = () => {
  let tagArr = [];
  tagArr.push(tags[Math.floor(Math.random() * tags.length)]);
  tagArr.push(tags[Math.floor(Math.random() * tags.length)]);
  return tagArr;
};

const randomPrice = () => {
  return Math.floor(Math.random() * 999) + 1
};

const salePriceThenSpecialTag = () => {
  let diceRoll = chance.d8();
  let isExclusive = diceRoll <= 1 ? 'Exclusive' : null;
  if (diceRoll < 4) return [null, isExclusive];
  //salePrice is 0 position specialTag is 1
  return [Math.floor(Math.random() * 500) + 1, 'Sale'];
};

const randomStars = () => {
  return Math.floor(Math.random() * 5) + 1;
}

const randomTotalReviews = () => {
  return Math.floor(Math.random() * 200) + 1;
};

const randomPictureLink = () => {
  return 'https://picsum.photos/200/300/?random';
};

const randomKind = () => {
  return kinds[Math.floor(Math.random() * kinds.length)]
};

module.exports = {
  randomTitle,
  randomTags,
  randomKind,
  randomPictureLink,
  randomPrice,
  randomStars,
  randomTotalReviews,
  salePriceThenSpecialTag,
}

