const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const userMiddleware = require('../middlewares/userMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

// Authentication for users -- ability to logout, register, login, and account activation.
router.get('/logout', authController.logout);
router.post('/register', authController.signup);
router.post('/login', authController.login);

router.get(
  '/me',
  authMiddleware.checkLoggedUser,
  userMiddleware.getMe,
  userController.getUser
);

module.exports = router;
