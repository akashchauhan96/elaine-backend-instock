const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");

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
      res.status(400).send(`Error retrieving inventories ${err}`);
    });
};

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
          });
      })
      .catch((err) => {
        res
          .status(400)
          .send(
            `Warehouse_id value does not exist in the warehouses table ${err}`
          );
      });
  }
};

module.exports = {
  getAll,
  addInventory,
};
