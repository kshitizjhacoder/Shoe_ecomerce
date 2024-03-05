const express = require('express');
const router = express.Router();
const BagController = require('../controllers/bagAll');

// GET all orders for a user
router.get('/:id', BagController.bagAll);

// POST a new order or increase quantity if already exists
router.post('/:id', BagController.addToBag);

router.delete('/:id/:itemid', BagController.removeFromBag);

router.put('/:id/:itemid', BagController.updateBagItem);

module.exports = router;
