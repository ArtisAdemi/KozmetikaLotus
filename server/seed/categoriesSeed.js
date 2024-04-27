const fs = require('fs');
const models = require("../models"); // Adjust the path according to your project structure

const seedCategories = async () => {
  const categoriesData = JSON.parse(fs.readFileSync('categories.json', 'utf8'));

  for (const { name, subcategories } of categoriesData) {
    const [category, created] = await models.Categories.findOrCreate({
      where: { name },
      include: [models.Subcategory] // Include subcategories
    });

    if (created || (subcategories.length !== (category.Subcategories ? category.Subcategories.length : 0))) {
      for (const { name: subName } of subcategories) {
        await models.Subcategory.findOrCreate({
          where: { name: subName, CategoryId: category.id }
        });
      }
    }
  }
};

module.exports = seedCategories;
