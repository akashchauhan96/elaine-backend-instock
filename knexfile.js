require("dotenv").config();

// Deconstruct variables from .env file
const {DATABASE, USER, PASSWORD} = process.env;

// Connect database with Knex
module.exports = {
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: USER,
        password: PASSWORD,
        database: DATABASE,
        charset: 'utf8',
    }
  };
  