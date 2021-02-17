const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/userModel');

/**
 * This function is used to verify the current token from user's cookie.
 *
 * @param {token} token - JWT token
 */
const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return reject(err);
      }

      resolve(decoded);
    });
  });

/**
 * This function is used to determine whether the user is logged in or not.
 *
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @param {next} next - Express's next function
 */
exports.checkLoggedUser = asyncHandler(async (req, res, next) => {
  let token;

  // 1) Fetch the token, then check if it is valid or not.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please login to get access!', 401)
    );
  }

  // 2) Verify the token.
  const verifiedToken = await verifyToken(token);

  // 3) Check if user still exists in the database.
  const loggedUser = await User.findById(verifiedToken.id);

  if (!loggedUser) {
    return next(
      new AppError('User belonging to this token does not exist!', 401)
    );
  }

  // 4) Grant user access to the route.
  req.user = loggedUser;
  next();
});

/**
 * This function is used to guard routes to prevent unauthorized access via roles.
 *
 * @param  {...string} roles - Variadic / spread array consisting of allowed roles
 */
exports.routeGuard = (...roles) => (req, res, next) => {
  // Roles in an array: ['user', 'admin', 'owner']. Default role = ['user'].
  if (!roles.includes(req.user.role)) {
    return next(
      new AppError('You do not have permission to perform this action!', 403)
    );
  }

  next();
};
