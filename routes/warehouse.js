const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController')

router
    .route('/')
    .get(warehouseController.getAll);

router
    .route('/:id')
    .get(warehouseController.getOne);

module.exports = router;