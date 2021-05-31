const Floor = require('../models/floorModel');
const factory = require('../utils/handlerFactory');

/**
 * Creates a single floor.
 */
exports.createFloor = factory.createOne(Floor);

/**
 * Get all floors that exist.
 */
exports.getAllFloors = factory.getAll(Floor);

/**
 * Gets a single floor.
 */
exports.getFloor = factory.getOne(Floor);

/**
 * Updates a single floor.
 */
exports.updateFloor = factory.updateOne(Floor);

/**
 * Deletes a single floor.
 */
exports.deleteFloor = factory.deleteOne(Floor);
