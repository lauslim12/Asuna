const Employee = require('../models/employeeModel');
const factory = require('../utils/handlerFactory');

/**
 * Creates a single employee.
 */
exports.createEmployee = factory.createOne(Employee);

/**
 * Get all employees that exist.
 */
exports.getAllEmployees = factory.getAll(Employee);

/**
 * Gets a single employee.
 */
exports.getEmployee = factory.getOne(Employee);

/**
 * Updates a single employee.
 */
exports.updateEmployee = factory.updateOne(Employee);

/**
 * Deletes a single employee.
 */
exports.deleteEmployee = factory.deleteOne(Employee);
