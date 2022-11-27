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

const deleteItem = (req, res) => {
    console.log(req.params.id);
    knex("inventories")
    .where({ id: req.params.id })
    .delete()
    .then(() => {
      //we'll use the 204 response for DELETE request
      res
        .status(204)
        .send(
          `The inventory item with id: ${req.params.id} has been successfully deleted`
        );
    })
    .catch((err) =>
      res.status(404).send(`Error deleting Warehouse ${req.params.id} ${err}`)
    );
}

module.exports = {
    getAll,
    deleteItem
}