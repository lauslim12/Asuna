const mongoose = require('mongoose');

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
    default: null,
  },
  startDate: {
    type: Date,
    required: [true, 'An order must have a start date!'],
    validate: {
      validator: function (value) {
        return new Date(Date.now()) < new Date(value);
      },
      message: 'The start date must be equal or after this day!',
    },
  },
  endDate: {
    type: Date,
    required: [true, 'An order must have an end date!'],
    validate: {
      validator: function (value) {
        return new Date(value) > new Date(this.startDate);
      },
      message: 'The end date must be after the start date!',
    },
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

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
