require("dotenv").config();

// Deconstruct variables from .env file
const urlDB = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.PORT}/${process.env.DB_NAME}`;

// Connect database with Knex
module.exports = {
  client: "mysql2",
  connection: urlDB,
};
