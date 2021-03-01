const asyncHandler = require('../utils/asyncHandler');
const factory = require('../utils/handlerFactory');
const User = require('../models/userModel');

exports.getUser = factory.getOne(User);

exports.makeAdmin = asyncHandler(async (req, res, next) => {
  // 1. Choose the user ID based from the employee id that is given in the request.
  const modifiedUser = await User.findByIdAndUpdate(
    req.body.id,
    { role: 'admin' },
    { new: true, runValidators: true }
  );

  // 2. Done.
  res.status(200).json({
    status: 'success',
    data: modifiedUser,
  });
});

exports.revokeAdmin = asyncHandler(async (req, res, next) => {
  // 1. Choose the user ID based from the employee id that is given in the request.
  const modifiedUser = await User.findByIdAndUpdate(
    req.body.id,
    { role: 'user' },
    { new: true, runValidators: true }
  );

  // 2. Done.
  res.status(200).json({
    status: 'success',
    data: modifiedUser,
  });
});
