require("dotenv").config();

// Deconstruct variables from .env file
const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

// Connect database with Knex
module.exports = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    charset: "utf8",
  },
};
