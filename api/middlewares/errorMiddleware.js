/* eslint-disable no-console */
const mongoose = require('mongoose');
const AppError = require('../utils/appError');

/**
 * This function is used to throw an error in development mode.
 *
 * @param {err} err - Express's error object
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @return void
 */
const sendErrorDevelopment = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

/**
 * This function is used to throw an error in production mode.
 *
 * @param {err} err - Express's error object
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @return void
 */
const sendErrorProduction = (err, req, res) => {
  // Operational error, trusted error: send message to the client.
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Unknown error: do not send message to the client.
  } else {
    // 1) Log the error to the console.
    console.error('ERROR 💥', err);

    // 2) Send generic message.
    res.status(500).json({
      status: 'error',
      message: 'Something is wrong!',
    });
  }
};

/**
 * This function is used to handle JWT invalid token errors.
 *
 * @return A new error 'AppError' object
 */
const handleJWTError = () =>
  new AppError(`Invalid token! Please log in again!`, 401);

/**
 * This function is used to handle JWT expired error.
 *
 * @return A new error 'AppError' object
 */
const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please login again!', 401);

/**
 * This function is used to handle key value data type errors in Mongoose.
 *
 * @param {*} err - Express's error object
 * @return A new error 'AppError' object
 */
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}!`;
  return new AppError(message, 400);
};

/**
 * This function is used to handle duplicate fields error.
 *
 * @param {err} err - Express's error object
 * @return A new error 'AppError' object
 */
const handleDuplicateFieldsDB = (err) => {
  const message = Object.keys(err.keyValue)
    .map(
      (key) =>
        `Value ${err.keyValue[key]} is already taken for field ${key}! Please use another value!`
    )
    .join(', ');
  return new AppError(message, 400);
};

/**
 * This function is used to handle validation errors.
 *
 * @param {err} err - Express's error object
 * @return A new error 'AppError' object
 */
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(' ')}`;
  return new AppError(message, 400);
};

/**
 * This is the global error handling middleware of the application.
 * Start the middlewares here. End the middleware by using res.send.status.
 * The arguments (err, req, res, next) is enough for Express to know that this is an error handling method.
 *
 * @param {*} err - Express's error object
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @param {next} next - Express's next function
 * @return void
 */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDevelopment(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let errorCopy = { ...err };
    errorCopy.message = err.message;

    if (err instanceof mongoose.Error.CastError) {
      errorCopy = handleCastErrorDB(errorCopy);
    }

    if (errorCopy.code === 11000) {
      errorCopy = handleDuplicateFieldsDB(errorCopy);
    }

    if (err instanceof mongoose.Error.ValidationError) {
      errorCopy = handleValidationErrorDB(errorCopy);
    }

    if (errorCopy.name === 'JsonWebTokenError') {
      errorCopy = handleJWTError();
    }

    if (errorCopy.name === 'TokenExpiredError') {
      errorCopy = handleJWTExpiredError();
    }

    sendErrorProduction(errorCopy, req, res);
  }
};
