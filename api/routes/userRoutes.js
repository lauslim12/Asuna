const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Authentication for users -- ability to logout, register, login, and account activation.
router.get('/logout', authController.logout);
router.post('/register', authController.signup);
router.post('/login', authController.login);

module.exports = router;
