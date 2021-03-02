const mongoose = require('mongoose');
const validate = require('validator');

const visitorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please tell us your first name!'],
  },
  lastName: {
    type: String,
    required: [true, 'Please tell us your last name!'],
  },
  address: {
    type: String,
    required: [true, 'Please tell us your address!'],
  },
  email: {
    type: String,
    required: [true, 'Please tell us your email!'],
    unique: true,
    lowercase: true,
    validate: [validate.isEmail, 'The email must be a valid email!'],
  },
  purpose: {
    type: String,
    required: [true, 'A visitor must have a purpose!'],
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: [true, 'A visitor must have a room!'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
