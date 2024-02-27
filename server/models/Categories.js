module.exports = (sequelize, DataTypes) => {
    // Create DB Model
    const Categories = sequelize.define("Categories", { //Name of Column
        // Table Fields 
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    // This creates a table with many to many relation
    // WE MUST ALSO DO THIS IN PRODUCT.js
    Categories.associate = (models) => {
        Categories.belongsToMany(models.Products, { through: 'ProductCategories' });
    };

    return Categories
}
