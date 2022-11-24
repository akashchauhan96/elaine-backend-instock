const knex = require("knex")(require("../knexfile"));

// GET all of the warehouses within the warehouses table in instock database
const getAll = (_req, res) => {
  knex("warehouses")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving Warehouses ${err}`);
    });
};

// GET a single warehouse
const getSingle = (req, res) => {
  knex(`warehouses`)
    .where({ id: req.params.id })
    .then((data) => {
      // to return a 404 error in case data wasn't found
      if (!data.length) {
        return res
          .status(404)
          .send(`Record with id: ${req.params.id} was not found`);
      }
      // in case the request was successful, Knex returns an array of record, and we respond with a single object
      res.status(200).jason(data[0]);
    })
    .catch((err) =>
      res.status(400).semd(`Error retrieving warehouse ${req.params.id} ${err}`)
    );
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
  deleteWarehouse,
  updateWarehouse,
  getSingle,
};
