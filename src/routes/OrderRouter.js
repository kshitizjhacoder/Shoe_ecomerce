const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderedAll');

// GET all orders for a user
router.get('/orders/:id', orderController.orderAll);

// POST a new order or increase quantity if already exists
router.post('/orders', orderController.addOrder);

module.exports = router;
