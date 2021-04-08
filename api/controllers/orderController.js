const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');
const factory = require('../utils/handlerFactory');
const Order = require('../models/orderModel');
const Room = require('../models/roomModel');
const Voucher = require('../models/voucherModel');

const getNumberOfMonths = (startDate, endDate) => {
  const startDateYear = startDate.getFullYear();
  const endDateYear = endDate.getFullYear();
  const startDateMonth = startDate.getMonth();
  const endDateMonth = endDate.getMonth();

  const numberOfMonths =
    endDateMonth + 12 * endDateYear - (startDateMonth + 12 * startDateYear);

  // Return with one inclusive.
  return numberOfMonths + 1;
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

  const order = await Order.findById(req.params.id);

  if (order.employee && order.employee.toString() !== req.user._id.toString()) {
    return next(
      new AppError('You cannot update orders that are not yours!'),
      400
    );
  }

  let updatedOrder;
  if (status === 'ordered') {
    updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status, employee: null },
      { new: true, runValidators: true }
    );
  } else {
    updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status, employee: req.user._id },
      { new: true, runValidators: true }
    );
  }

  res.status(200).json({
    status: 'success',
    data: updatedOrder,
  });
});

exports.placeOrder = asyncHandler(async (req, res, next) => {
  // 1. User inputs their request into the system.
  const { requestedRoom, endDate, startDate } = req.body;

  // 2. Check if there is the same room (in Orders collection) whose end date is higher than the requested start date.
  // Also, if an order is already cancelled, do not invalidate!
  // ex: Order.findOne({ $and: [{ room: requestedRoom }, { endDate: { $gte: requestedStartDate } }] })
  const duplicate = await Order.findOne({
    $and: [
      { room: requestedRoom },
      { endDate: { $gte: startDate } },
      { status: { $ne: 'cancelled' } },
    ],
  });

  // 3. If there is, invalidate the request.
  // note: if coworking space, don't invalidate.
  if (duplicate) {
    return next(
      new AppError(
        'The room that you want to order has been reserved by someone else!',
        400
      )
    );
  }

  // Check for available vouchers.
  const code = req.body.voucher || null;
  let voucher;
  let disc = 0;

  if (code) {
    voucher = await Voucher.findOne({ code });

    if (voucher) {
      disc = voucher.discount;
    }
  }

  // 4. If not, calculate the price.
  const room = await Room.findById(requestedRoom);
  const numberOfMonths = getNumberOfMonths(
    new Date(startDate),
    new Date(endDate)
  );
  const totalPrice = room.price * numberOfMonths * (1 - disc);

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

exports.getAdminManagedOrders = asyncHandler(async (req, res, next) => {
  // 1. Get all data whose 'employee' is either undefined or his ID.
  const myOrders = await Order.find({
    $or: [{ employee: req.user._id }, { employee: null }],
  })
    .populate('user', 'firstName lastName')
    .populate('room', 'name thumbnail');

  res.status(200).json({
    status: 'success',
    data: myOrders,
  });
});

exports.getEarnings = asyncHandler(async (req, res, next) => {
  const allOrders = await Order.find(
    { status: 'finished' },
    'startDate endDate totalPrice'
  );

  const sumOfEarnings = await Order.aggregate([
    {
      $match: {
        status: 'finished',
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: '$totalPrice',
        },
      },
    },
    {
      $project: {
        total: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    total: sumOfEarnings[0].total,
    data: allOrders,
  });
});

// Not documented yet.
exports.getMyOrders = asyncHandler(async (req, res, next) => {
  // 1. Get all Orders with the current user ID.
  const myOrders = await Order.find({ user: req.user._id }).populate(
    'room',
    'name thumbnail'
  );

  res.status(200).json({
    status: 'success',
    data: myOrders,
  });
});
