const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'A voucher must consists of a promo code!'],
    unique: true,
  },
  discount: {
    type: Number,
    required: [true, 'A voucher must have a discount!'],
  },
  startDate: {
    type: Date,
    required: [true, 'A voucher must have a start date!'],
    validate: {
      validator: function (value) {
        return new Date(Date.now()) < new Date(value);
      },
      message: 'The start date must be equal or after this day!',
    },
  },
  endDate: {
    type: Date,
    required: [true, 'A voucher must have an end date!'],
    validate: {
      validator: function (value) {
        return new Date(value) > new Date(this.startDate);
      },
      message: 'The end date must be after the start date!',
    },
  },
});

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
