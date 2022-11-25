const knex = require("knex")(require("../knexfile"));

// GET all of the warehouses within the warehouses table in instock database
const getAll = (_req, res) => {
  knex("warehouses")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving warehouses ${err}`);
    });
};

const getOne = (req, res) => {
  knex("warehouses")
    .where({ id: req.params.id })
    .then((data) => {
      res.status(200).json(data[0]);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving warehouse ${err}`);
    });
};

// Updating a warehouse record
const updateWarehouse = (req, res) => {
  knex("warehouses")
    .update(req.body)
    .where({ id: req.params.id })
    .then((warehouseData) => {
      console.log(warehouseData);
      res
        .status(200)
        .send(`Warehouse with id: ${req.params.id} has been updated`);
    })
    .catch((err) =>
      res.status(400).send(`Error updating Warehouse ${req.params.id} ${err}`)
    );
};

const getStock = (req, res) => {
  knex("inventories")
    .where({ warehouse_id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving warehouse inventory ${err}`);
    });
};

// DELETE a selected warehouse from the database, including all its inventory
const deleteWarehouse = (req, res) => {
  knex("warehouses")
    .delete()
    .where({ id: req.params.id })
    .then(() => {
      //we'll use the 204 response for DELETE request
      res
        .status(204)
        .send(
          `The warehouse with id: ${req.params.id} has been successfully deleted`
        );
    })
    .catch((err) =>
      res.status(400).send(`Error deleting Warehouse ${req.params.id} ${err}`)
    );
};

module.exports = {
  getAll,
  getOne,
  getStock,
  deleteWarehouse,
  updateWarehouse,
};
