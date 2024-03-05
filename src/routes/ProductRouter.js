const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/displayAll');

router.get('/product/', ProductController.displayAll);
router.get('/product/:id', ProductController.displayspecific);
module.exports = router;