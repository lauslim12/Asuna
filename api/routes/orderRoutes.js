const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get(
  '/my-orders',
  authMiddleware.checkLoggedUser,
  orderController.getMyOrders
);

// Encapsulation for easier handling.
router.use(
  authMiddleware.checkLoggedUser,
  authMiddleware.routeGuard('admin', 'owner')
);

router.get('/', orderController.getAllOrders);
router.get('/my-managed-orders', orderController.getAdminManagedOrders);
router.post('/place-order', orderController.placeOrder);
router.post('/change-order-status/:id', orderController.changeOrderStatus);
router.get('/earnings', orderController.getEarnings);

module.exports = router;
