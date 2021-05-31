const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');
const Employee = require('../models/employeeModel');
const factory = require('../utils/handlerFactory');
const User = require('../models/userModel');

/**
 * Creates a single employee.
 */
exports.createEmployee = factory.createOne(Employee);

/**
 * Get all employees that exist.
 */
exports.getAllEmployees = factory.getAll(Employee);

/**
 * Gets a single employee.
 */
exports.getEmployee = factory.getOne(Employee);

/**
 * Updates a single employee.
 */
exports.updateEmployee = factory.updateOne(Employee);

/**
 * Deletes a single employee.
 */
exports.deleteEmployee = factory.deleteOne(Employee);

exports.makeEmployee = asyncHandler(async (req, res, next) => {
  // 1. Take all inputs.
  const { email, jobdesc, salary } = req.body;

  // 2. Get the user with 'email'.
  const user = await User.findOne({ email });
  const employee = await Employee.findOne({ user: user._id });

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

  if (jobdesc === 'owner') {
    return next(new AppError('You cannot make someone an owner!', 400));
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
