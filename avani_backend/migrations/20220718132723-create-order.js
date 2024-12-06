"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      itemPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      orderItems: {
        type: Sequelize.TEXT("medium"),
        allowNull: false,
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shippingAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shippingPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      taxPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isDelivered: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      deliveredAt: {
        type: Sequelize.DATE,
      },
      isPaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      paidAt: {
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
