const factory = require('../utils/handlerFactory');
const Voucher = require('../models/voucherModel');
const asyncHandler = require('../utils/asyncHandler');

exports.createVoucher = factory.createOne(Voucher);
exports.getAllVouchers = factory.getAll(Voucher);

exports.getDiscountValue = asyncHandler(async (req, res, next) => {
  // 1. Get all variables.
  const { code } = req.params;
  let discountValue = 0;

  // 2. Get voucher based on code.
  const voucher = await Voucher.findOne({ code });

  if (voucher) {
    discountValue = voucher.discount;
  }

  // 3. Send back response.
  res.status(200).json({
    status: 'success',
    discount: discountValue,
  });
});
