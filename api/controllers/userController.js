const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');
const Employee = require('../models/employeeModel');
const factory = require('../utils/handlerFactory');
const User = require('../models/userModel');

exports.getUser = factory.getOne(User);

exports.makeAdmin = asyncHandler(async (req, res, next) => {
  // 1. Choose user to be made admin.
  // 2. Choose the employee ID to be associated with that account.
  // 3. Done.
});

exports.makeEmployee = asyncHandler(async (req, res, next) => {
  // 1. Take all inputs.
  const { email, jobdesc, salary } = req.body;

  // 2. Get the user with 'email'.
  const user = await User.findOne({ email });
  const employee = await Employee.find({ user: user._id });

  if (!user) {
    return next(new AppError('There is no user with that email address!'), 400);
  }

  if (employee) {
    return next(
      new AppError(
        'The user that you already chose is already an employee!',
        400
      )
    );
  }

  // 2. Insert as normal.
  const newEmployee = await Employee.create({
    salary,
    jobdesc,
    user: user._id,
  });

  // 3. Done.
  res.status(201).json({
    status: 'success',
    data: newEmployee,
  });
});
