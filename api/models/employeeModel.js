const bcrypt = require('bcryptjs');
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
  username: {
    type: String,
    required: [true, 'An employee must have a username!'],
  },
  password: {
    type: String,
    required: [true, 'Please input your password!'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      // This only works on create and save, because Mongoose does not keep object in memory.
      // Another reason is because the middleware will not be run during update. Passwords will not be encrypted!
      // We have to use the 'this' keyword as it returns to currently processed docs.
      // Arrow function does not work on this keyword!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
});

// Document middleware, only works on save() and create()!
// Doesn't work on update() and insert()!
employeeSchema.pre('save', async function (next) {
  // Only run the encryption if the password is modified.
  if (!this.isModified('password')) {
    return next();
  }

  // Encrypt the password with BCRYPT Algorithm.
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

employeeSchema.methods.isPasswordCorrect = async function (
  password,
  userPassword
) {
  return await bcrypt.compare(password, userPassword);
};

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
