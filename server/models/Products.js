module.exports = (sequelize, DataTypes) => {
    // Creating Sequelize DB model
    const Products = sequelize.define("Products", {
        title: {
            type: DataTypes.STRING(255),
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
     Products.associate = (models) => {
        Products.belongsToMany(models.Categories, { through: 'ProductCategories' });
        Products.hasMany(models.Images, { foreignKey: 'ProductId' });
    };

    return Products;
}
