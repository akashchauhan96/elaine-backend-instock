const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");
const uuid = uuidv4();

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

// GET details for one warehouse 
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

// POST  new warehouse
const addWarehouse = (req, res) => {
  req.body.id = uuid;
  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    return res
      .status(400)
      .send(
        "Please provide the required Warehouse Name, Street Address, City, Country, Contact Name, Position, Phone Number, and Email"
      );
  }
  knex("warehouses")
    .insert(req.body)
    .then(() => {
      const newWarehouseURL = `/warehouse/${req.body.id}`;
      res.status(201).location(newWarehouseURL).send(req.body);
    })
    .catch((err) => {
      res.status(400).json({
        message: `Error creating new Warehouse ${err}`,
      });
    });
};

// Updating a warehouse record
const updateWarehouse = (req, res) => {
  console.log(req.body);
  // Validating PUT request for required data
  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    return res
      .status(400)
      .send(
        "Please make sure to provide name, manager, address, phone and email fields in a request"
      );
  }
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

// GET inventory for a specific warehouse
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
  addWarehouse,
};
