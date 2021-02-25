const asyncHandler = require('../utils/asyncHandler');
const factory = require('../utils/handlerFactory');
const User = require('../models/userModel');

exports.getUser = factory.getOne(User);

exports.makeAdmin = asyncHandler(async (req, res, next) => {
  // 1. Choose user to be made admin.
  // 2. Choose the employee ID to be associated with that account.
  // 3. Done.
});
