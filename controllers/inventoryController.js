const knex = require("knex")(require("../knexfile"));

const getAll = (_req, res) => {
    knex("inventories")
    .join('warehouses', 'inventories.warehouse_id', 'warehouses.id')
    .select('inventories.id', 'warehouses.warehouse_name', 'inventories.item_name', 'inventories.description', 'inventories.category', 'inventories.status', 'inventories.quantity')
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