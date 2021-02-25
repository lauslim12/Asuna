const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get(
  '/',
  authMiddleware.checkLoggedUser,
  authMiddleware.routeGuard('admin', 'owner'),
  orderController.getAllOrders
);

router.post(
  '/place-order',
  authMiddleware.checkLoggedUser,
  orderController.placeOrder
);

module.exports = router;
