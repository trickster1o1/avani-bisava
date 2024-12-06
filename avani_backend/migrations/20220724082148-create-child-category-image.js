"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("childCategoryImages", {
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
      image: {
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
    await queryInterface.dropTable("childCategoryImages");
  },
};
