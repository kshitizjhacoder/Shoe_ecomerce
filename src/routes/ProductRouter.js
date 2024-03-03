const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/displayAll');

router.get('/', ProductController.displayAll);

module.exports = router;