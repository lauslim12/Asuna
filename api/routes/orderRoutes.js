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

router.get(
  '/my-managed-orders',
  authMiddleware.checkLoggedUser,
  authMiddleware.routeGuard('admin', 'owner'),
  orderController.getAdminManagedOrders
);

router.post(
  '/place-order',
  authMiddleware.checkLoggedUser,
  authMiddleware.routeGuard('admin', 'owner'),
  orderController.placeOrder
);

router.post(
  '/change-order-status/:id',
  authMiddleware.checkLoggedUser,
  authMiddleware.routeGuard('admin', 'owner'),
  orderController.changeOrderStatus
);

router.get(
  '/earnings',
  authMiddleware.checkLoggedUser,
  authMiddleware.routeGuard('admin', 'owner'),
  orderController.getEarnings
);

module.exports = router;
