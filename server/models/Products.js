module.exports = (sequelize, DataTypes) => {
    // Creating Sequelize DB model
    const Products = sequelize.define("Products", {
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        brand:{
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        discount:{
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });
     // This creates a table with many to many relation
    // WE MUST ALSO DO THIS IN Categories.js
    Products.associate = (models) => {
        Products.belongsToMany(models.Categories, { through: 'ProductCategories' });
    };
    // This tells sequelize that Products is associated with images table
    Products.associate = (models) => {
        Products.hasMany(models.Images, { foreignKey: 'ProductId' });
    };

    return Products;
}
