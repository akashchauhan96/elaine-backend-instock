const knex = require("knex")(require("../knexfile"));

const getAll = (_req, res) => {
    knex("inventories")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving inventories ${err}`);
    });
};

module.exports = {
    getAll
}