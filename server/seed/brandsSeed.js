const fs = require('fs');
const models = require('../models'); // Adjust the path according to your project structure

const seedBrands = async () => {
  const brandsPath = path.resolve(__dirname, '../brands.json');
  const brandsData = JSON.parse(fs.readFileSync(brandsPath, 'utf8'));

  for (const { name } of brandsData) {
    await models.Brand.findOrCreate({
      where: { name }
    });
  }
};

module.exports = seedBrands;
