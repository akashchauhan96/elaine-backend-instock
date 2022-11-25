const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouseController");

router.route("/").get(warehouseController.getAll);

router.route("/").post(warehouseController.addWarehouse);

// router.route("/warehouse").post(warehouseController.addWarehouse);

router
  .route("/:id")
  .get(warehouseController.getOne)
  .put(warehouseController.updateWarehouse)
  .delete(warehouseController.deleteWarehouse);

router.route("/:id/inventories").get(warehouseController.getStock);

module.exports = router;
