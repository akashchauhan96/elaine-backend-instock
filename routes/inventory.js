const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController')

router.route('/').get(inventoryController.getAll);

module.exports = router;