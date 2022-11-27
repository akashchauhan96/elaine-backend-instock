const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router
  .route("/")
  .get(inventoryController.getAll)
  .post(inventoryController.addInventory);

module.exports = router;
