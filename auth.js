const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

// Routes
router.post('/login', authController.login);


module.exports = router;