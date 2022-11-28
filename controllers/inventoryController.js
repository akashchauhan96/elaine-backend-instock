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

// DELETE inventory item
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
      res.status(404).send(`Error deleting inventory ${req.params.id} ${err}`)
    );
}

// POST new inventory item
const addInventory = (req, res) => {
  console.log(req.body.status);
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
        "Please provide the required Item Name, Description, Category, Status, Quantity and Warehouse related to the new inventory item"
      );
  } else {
    knex("inventories")
      .where({ warehouse_id: req.body.warehouse_id })
      .then((inventoryData) => {
        console.log(inventoryData)
        res
          .status(200)
          .send(`Inventory with id: ${req.params.id} has been updated`)
        })
          .catch((err) => {
            res
              .status(400)
              .send(
                `Error adding inventory item ${req.params.id} ${err}`
              );
          });
      };
  }

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
        console.log(inventoryData);
        res
          .status(200)
          .send(`Inventory item with id: ${req.params.id} has been updated`);
        }) 
      .catch((err) => {
            res
              .status(400)
              .send(
                `Inventory_id value does not exist in the warehouses table`
              );
          });
      };
  }

module.exports = {
  getAll,
  addInventory,
  deleteItem,
  editInventory,
};
