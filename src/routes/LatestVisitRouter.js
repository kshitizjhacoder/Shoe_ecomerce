const express = require('express');
const router = express.Router();
const VisitedController = require('../controllers/latestvisits');

router.get('/:id', VisitedController.listVisited);

router.post('/:id', VisitedController.addLisitedVisit);

module.exports = router;