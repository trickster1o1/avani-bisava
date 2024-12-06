"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
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
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      main_category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sub_category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      child_category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price_discount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      imageArray: {
        type: Sequelize.TEXT("medium"),
        allowNull: true,
      },
      isFeatured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bestSeller: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      trending: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      mostLoved: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable("Products");
  },
};
