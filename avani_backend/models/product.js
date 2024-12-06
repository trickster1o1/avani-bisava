"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Banner, Review }) {
      // define association here
      this.hasMany(Banner, { foreignKey: "product_id" });
      this.hasMany(Review, { foreignKey: "product_id", as: "review" });
    }
  }
  Product.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      main_category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sub_category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      child_category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price_discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      imageArray: {
        type: DataTypes.TEXT("medium"),
        allowNull: true,
      },
      isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bestSeller: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      trending: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      mostLoved: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
