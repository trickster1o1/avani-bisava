"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class childCategoryImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  childCategoryImage.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ChildCategoryImage",
    }
  );
  return childCategoryImage;
};
