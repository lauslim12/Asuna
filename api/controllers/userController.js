const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');
const Employee = require('../models/employeeModel');
const factory = require('../utils/handlerFactory');
const User = require('../models/userModel');

exports.getUser = factory.getOne(User);

exports.makeAdmin = asyncHandler(async (req, res, next) => {
  // 1. Choose the user ID based from the employee id that is given in the request.
  // 2. Done.
});
