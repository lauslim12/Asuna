const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const visitorController = require('../controllers/visitorController');

const router = express.Router();

router.post(
  '/',
  authMiddleware.checkLoggedUser,
  authMiddleware.routeGuard('admin', 'owner'),
  visitorController.createVisitor
);

module.exports = router;
