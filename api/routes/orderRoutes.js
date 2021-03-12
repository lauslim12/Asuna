const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Route for users.
router.use(authMiddleware.checkLoggedUser);
router.get('/my-orders', orderController.getMyOrders);
router.post('/place-order', orderController.placeOrder);

// Encapsulation for easier handling.
router.use(authMiddleware.routeGuard('admin', 'owner'));

router.get('/', orderController.getAllOrders);
router.get('/my-managed-orders', orderController.getAdminManagedOrders);
router.post('/change-order-status/:id', orderController.changeOrderStatus);
router.get('/earnings', orderController.getEarnings);

module.exports = router;
