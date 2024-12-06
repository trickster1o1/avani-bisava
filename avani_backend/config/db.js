const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_NAME,
  // process.env.DATABASE_USERNAME,
  // process.env.DATABASE_PASSWORD,
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
  }
);
// const db = new Sequelize("biidhanc_avani_db", "root", "cpanel_bd_pass", {
//   host: "localhost",
//   dialect: "mysql",
// });

module.exports = db;
