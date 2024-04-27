const fs = require('fs');
const models = require('../models'); // Adjust the path according to your project structure

const seedBrands = async () => {
  const brandsData = JSON.parse(fs.readFileSync('brands.json', 'utf8'));

  for (const { name } of brandsData) {
    await models.Brand.findOrCreate({
      where: { name }
    });
  }
};

module.exports = seedBrands;
