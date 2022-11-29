const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");

// GET list of all inventory items
const getAll = (_req, res) => {
  knex("inventories")
    .join("warehouses", "inventories.warehouse_id", "warehouses.id")
    .select(
      "inventories.id",
      "warehouses.warehouse_name",
      "inventories.item_name",
      "inventories.description",
      "inventories.category",
      "inventories.status",
      "inventories.quantity"
    )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving inventory items ${err}`);
    });
};

const getOne = (req, res) => {
  knex("inventories")
    .select(
      "inventories.id",
      "warehouses.warehouse_name",
      "inventories.item_name",
      "inventories.description",
      "inventories.category",
      "inventories.status",
      "inventories.quantity"
    )
    .join("warehouses", "inventories.warehouse_id", "warehouses.id")
    .where({ "inventories.id": req.params.id })
    .then((data) => {
      res.status(200).json(data[0]);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving inventory ${err}`);
    });
};

// DELETE inventory item
const deleteItem = (req, res) => {
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
      res.status(404).send(`Error deleting inventory ${req.params.id} ${err}`)
    );
};

// POST new inventory item
const addInventory = (req, res) => {
  req.body.id = uuidv4();
  if (
    !req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    (!req.body.quantity && req.body.status === "In Stock")
  ) {
    return res
      .status(400)
      .send(
        "Please provide the required Warehouse ID, Item Name, Description, Category, Status, and Quantity related to the new inventory item"
      );
  } else {
    knex("inventories")
      .where({ warehouse_id: req.body.warehouse_id })
      .then(() => {
        knex("inventories")
          .insert(req.body)
          .then(() => {
            const newInventoryURL = `/inventory/${req.body.id}`;
            res.status(201).location(newInventoryURL).send(req.body);
          })
          .catch((err) => {
            res
              .status(400)
              .send(
                `Warehouse_id value does not exist in the warehouses table`
              );
          });
      });
  }
};

// this is to update an inventory item
const editInventory = (req, res) => {
  if (
    !req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    (!req.body.quantity && req.body.status === "In Stock")
  ) {
    return res
      .status(400)
      .send(
        "Please provide the required Warehouse, Item Name, Description, Category, Status, and Quantity related to the new inventory item"
      );
  } else {
    knex("inventories")
      .update(req.body)
      .where({ id: req.params.id })
      .then((inventoryData) => {
        res
          .status(200)
          .send(`Inventory item with id: ${req.params.id} has been updated`);
      })
      .catch((err) => {
        res
          .status(400)
          .send(`Inventory_id value does not exist in the warehouses table`);
      });
  }
};

module.exports = {
  getAll,
  addInventory,
  deleteItem,
  getOne,
  editInventory,
};
