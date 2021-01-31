const Room = require('../models/roomModel');
const factory = require('../utils/handlerFactory');

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
