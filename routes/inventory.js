const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router
  .route("/")
    .get(inventoryController.getAll)
    .post(inventoryController.addInventory);

router
  
  .route("/:id")
    .get(inventoryController.getOne)
    .delete(inventoryController.deleteItem)
    .put(inventoryController.editInventory);

module.exports = router;
