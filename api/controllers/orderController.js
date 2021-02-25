const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');
const factory = require('../utils/handlerFactory');
const Order = require('../models/orderModel');
const Room = require('../models/roomModel');

const getNumberOfMonths = (startDate, endDate) => {
  const startDateYear = startDate.getFullYear();
  const endDateYear = endDate.getFullYear();
  const startDateMonth = startDate.getMonth();
  const endDateMonth = endDate.getMonth();

  return (
    endDateMonth + 12 * endDateYear - (startDateMonth + 12 * startDateYear)
  );
};

exports.getAllOrders = factory.getAll(Order);

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
  const { requestedRoom, endDate, startDate } = req.body;

  // 2. Check if there is the same room (in Orders collection) whose end date is higher than the requested start date.
  // ex: Order.findOne({ $and: [{ room: requestedRoom }, { endDate: { $gte: requestedStartDate } }] })
  const duplicate = await Order.findOne({
    $and: [{ room: requestedRoom }, { endDate: { $gte: startDate } }],
  });

  // 3. If there is, invalidate the request.
  // note: if coworking space, don't invalidate.
  if (duplicate) {
    return next(
      new AppError(
        'The room that you want to has been reserved by someone else!',
        400
      )
    );
  }

  // 4. If not, calculate the price.
  const room = await Room.findById(requestedRoom);
  const numberOfMonths = getNumberOfMonths(
    new Date(startDate),
    new Date(endDate)
  );
  const totalPrice = room.price * numberOfMonths;

  // ex: if it is office, then multiply per month, else multiply per hour.
  // 5. place the order with the 'processed' status.
  const newOrder = await Order.create({
    user: req.user._id,
    room: room._id,
    startDate,
    endDate,
    totalPrice,
  });

  res.status(201).json({
    status: 'success',
    data: newOrder,
  });
});
