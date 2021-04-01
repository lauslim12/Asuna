const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const voucherController = require('../controllers/voucherController');

const router = express.Router();

router
  .route('/')
  .get(
    authMiddleware.checkLoggedUser,
    authMiddleware.routeGuard('admin', 'owner'),
    voucherController.getAllVouchers
  )
  .post(
    authMiddleware.checkLoggedUser,
    authMiddleware.routeGuard('admin', 'owner'),
    voucherController.createVoucher
  );

router.route('/:code').get(voucherController.getDiscountValue);

module.exports = router;
