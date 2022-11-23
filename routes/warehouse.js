const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController')

router
    .route('/')
    .get(warehouseController.getAll);

module.exports = router;