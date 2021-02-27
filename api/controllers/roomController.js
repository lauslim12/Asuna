const multer = require('multer');
const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');
const Room = require('../models/roomModel');
const factory = require('../utils/handlerFactory');

const multerStorage = multer.memoryStorage();

// Multer Filter, we do not want any file other than images!
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('The file is not an image! Please upload only images!', 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadRoomImages = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'photos', maxCount: 3 },
]);

/**
 * Creates a single room.
 */
exports.createRoom = factory.createOne(Room);

/**
 * Get all rooms that exist.
 */
exports.getAllRooms = factory.getAll(Room);

/**
 * Gets a single room.
 */
exports.getRoom = factory.getOne(Room);

/**
 * Updates a single room.
 */
exports.updateRoom = factory.updateOne(Room);

/**
 * Deletes a single room.
 */
exports.deleteRoom = factory.deleteOne(Room);

/**
 * Gets a single room based on slug.
 */
exports.showRoom = asyncHandler(async (req, res, next) => {
  const room = await Room.findOne({ slug: req.params.slug });

  if (!room) {
    return next(new AppError('The room with that name does not exist!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: room,
  });
});
