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
  isValid: {
    type: Boolean,
    default: true,
  },
});

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
