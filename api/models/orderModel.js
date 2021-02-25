const mongoose = require('mongoose');
const validate = require('validator');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'An order must have a user!'],
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: [true, 'An order must have a room!'],
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
  startDate: {
    type: Date,
    required: [true, 'An order must have a start date!'],
    validate: [
      validate.isAfter,
      'An order must be booked starting from today!',
    ],
  },
  endDate: {
    type: Date,
    required: [true, 'An order must have an end date!'],
  },
  status: {
    type: String,
    enum: ['ordered', 'processed', 'accepted', 'finished', 'cancelled'],
    default: 'ordered',
    required: [true, 'An order must have a status!'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'An order must have a total price!'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.Model('Order', orderSchema);

module.exports = Order;
