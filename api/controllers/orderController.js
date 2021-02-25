const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');
const Order = require('../models/orderModel');

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
  const validStatuses = [
    'ordered',
    'processed',
    'accepted',
    'finished',
    'cancelled',
  ];

  if (!validStatuses.includes(status)) {
    return next(new AppError('Invalid status!', 400));
  }

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

exports.placeOrder = asyncHandler(async (req, res, next) => {
  // 1. User inputs their request into the system.
  // 2. Check if there is the same room (in Orders collection) whose end date is higher than the requested start date.
  // ex: Order.findOne({ $and: [{ room: requestedRoom }, { endDate: { $gte: requestedStartDate } }] })
  // note: if coworking space, don't invalidate.
  // 3. If there is, invalidate the request.
  // 4. If not, calculate the price.
  // ex: if it is office, then multiply per month, else multiply per hour.
  // 5. place the order with the 'processed' status.
});
