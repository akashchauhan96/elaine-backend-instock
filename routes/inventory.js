const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController')

router.route('/').get(inventoryController.getAll);

router.route('/:id').delete(inventoryController.deleteItem);

module.exports = router;