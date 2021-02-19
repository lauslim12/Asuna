const asyncHandler = require('../utils/asyncHandler');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

/**
 * This function is used to change an order status.
 * Accepted statuses are: ['ordered', 'processed', 'accepted', 'finished', 'cancelled'].
 *
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @param {next} next - Express's next function
 */
exports.changeOrderStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    data: updatedOrder,
  });
});

exports.makeAdmin = asyncHandler(async (req, res, next) => {
  // 1. Choose user to be made admin.
  // 2. Choose the employee ID to be associated with that account.
  // 3. Done.
});

exports.placeOrder = asyncHandler(async (req, res, next) => {
  // Pass...
});
