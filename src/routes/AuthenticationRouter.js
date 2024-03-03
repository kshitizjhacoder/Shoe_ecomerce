// authenticationrouter.js
const express = require('express');
const router = express.Router();

const auth = require('../controllers/authentication');

router.post('/register', auth.registration);
router.post('/login', auth.login);

module.exports = router;