"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      itemPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      orderItems: {
        type: DataTypes.TEXT("medium"),
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shippingAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shippingPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      taxPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isDelivered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deliveredAt: {
        type: DataTypes.DATE,
      },
      isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      paidAt: {
        type: DataTypes.DATE,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
