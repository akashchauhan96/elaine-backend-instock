const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouseController");

router.route("/").get(warehouseController.getAll);

router
  .route("/:id")
  .get(warehouseController.getSingle)
  .put(warehouseController.updateWarehouse)
  .delete(warehouseController.deleteWarehouse);

module.exports = router;
