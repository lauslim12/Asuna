/**
 * Note: Every function here naturally returns the asyncHandler and its insides.
 * Arrow function naturally returns everything if declared without curly brackets.
 */
const AppError = require('./appError');
const asyncHandler = require('./asyncHandler');

/**
 * This function is used to create a single document asynchronously.
 *
 * @param {Model} Model - A mongoose model
 * @return void
 */
exports.createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

/**
 * This function is used to get all documents in a model.
 *
 * @param {Model} Model - A mongoose model
 * @return void
 */
exports.getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.find();

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

/**
 * This function is used to get one document in a model.
 *
 * @param {Model} Model - A mongoose model
 * @return void
 */
exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError('No documents found with that ID!', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

/**
 * This function is used to update a document in a model.
 *
 * @param {Model} Model - A mongoose model
 * @return void
 */
exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No documents found with that ID!', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

/**
 * This function is used to delete a document in a model.
 *
 * @param {Model} Model - A mongoose model
 * @return void
 */
exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No documents found with that ID!', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
