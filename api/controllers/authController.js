const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

/**
 * This function is used to sign the JWT to check whether the token is valid or not.
 *
 * @param {id} id - ID of the user.
 */
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

/**
 * This function is used to create and send token to user's cookie.
 *
 * @param {user} user - Currently logged in user
 * @param {statusCode} statusCode - Status code of the request
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 */
const createAndSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
    ),
    httpOnly: true,
    // Send a cookie to be secure if its on a production environment.
    // Check if the connection is secure, OR if the header contains HTTPS.
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  // Send a cookie.
  res.cookie('jwt', token, cookieOptions);

  // Remove passwords from output, then send response.
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      data: user,
    },
  });
};

/**
 * This function is used to handle user registration.
 *
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @param {next} next - Express's next function
 */
exports.signup = asyncHandler(async (req, res, next) => {
  const { name, email, username, password, passwordConfirm } = req.body;

  const newUser = await User.create({
    name,
    email,
    username,
    password,
    passwordConfirm,
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: newUser,
    },
  });
});

/**
 * This function is used to handle user when he/she is logging in.
 *
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @param {next} next - Express's next function
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  // 1) Check if username and password exist.
  if (!username || !password) {
    return next(new AppError('Please provide a username and a password!', 400));
  }

  // 2) Check if user exists and the credentials are correct.
  const user = await User.findOne({ username: username }).select('+password');

  if (!user || !(await user.isPasswordCorrect(password, user.password))) {
    return next(new AppError('Incorrect username or password!', 401));
  }

  // 3) Check if the user is active.
  if (!user.isActive) {
    return next(
      new AppError(
        'Your account is not activated yet! Please check your email!',
        401
      )
    );
  }

  // 4) If it is true, send token back to client.
  createAndSendToken(user, 200, req, res);
});

/**
 * This function is used to handle a user's logging out.
 *
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @param {next} next - Express's next function
 */
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('jwt', 'loggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
  });
});
