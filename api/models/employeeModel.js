const mongoose = require('mongoose');
const validate = require('validator');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An employee must have a name!'],
  },
  address: {
    type: String,
    required: [true, 'An employee must have an address!'],
  },
  birthdate: {
    type: Date,
    required: [true, 'An employee must have a birthdate!'],
  },
  email: {
    type: String,
    required: [true, 'An employee must have an email!'],
    unique: true,
    lowercase: true,
    validate: [validate.isEmail, 'An employee must have a valid email!'],
  },
  salary: {
    type: Number,
    required: [true, 'An employee must have a salary!'],
  },
  picture: {
    type: String,
    required: [true, 'An employee must have a picture!'],
  },
  jobdesc: {
    type: String,
    enum: [
      'security',
      'office-boy',
      'greeter',
      'receptionist',
      'cafeteria-manager',
      'customer-service',
      'owner',
    ],
    required: [true, 'An employee must have a job description!'],
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
