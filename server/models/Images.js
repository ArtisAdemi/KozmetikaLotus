module.exports = (sequelize, DataTypes) => {
    const Images = sequelize.define("Images", {
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Images;
}