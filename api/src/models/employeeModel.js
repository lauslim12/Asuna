const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  salary: {
    type: Number,
    required: [true, 'An employee must have a salary!'],
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
  joinDate: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

employeeSchema.pre(/^find/, function (next) {
  this.populate('user');

  next();
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
