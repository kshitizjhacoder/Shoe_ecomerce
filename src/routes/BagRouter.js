const express = require('express');
const router = express.Router();
const BagController = require('../controllers/bagAll');

// GET all orders for a user
router.get('/bag/:id', BagController.bagAll);

// POST a new order or increase quantity if already exists
router.post('/bags', BagController.addToBag);

module.exports = router;
