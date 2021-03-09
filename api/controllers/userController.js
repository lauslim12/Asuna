const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');
const factory = require('../utils/handlerFactory');
const User = require('../models/userModel');

const filterObj = (obj, ...allowedFields) => {
  const newObject = {};

  // If the current field is one of the allowed fields?
  // Then, new object with the field name of the current field, should be equal.
  // Equal to what? Equal to whatever it is in the object, at the current field.
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObject[el] = obj[el];
    }
  });

  return newObject;
};

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

// Not implemented in Postman yet.
exports.updateMe = asyncHandler(async (req, res, next) => {
  // 1) Create an error if user tries to update their password.
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates! Please use the /updatePassword route!',
        400
      )
    );
  }

  // 2) If not, simply update the User document.
  // We'll only get the 'firstName', 'lastName', 'address', and 'email'.
  // Filter out unwanted field names first, that are not allowed to be updated.
  const filteredBody = filterObj(
    req.body,
    'firstName',
    'lastName',
    'address',
    'email'
  );

  // 3) Update the document.
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: updatedUser,
  });
});
