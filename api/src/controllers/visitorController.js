const factory = require('../utils/handlerFactory');
const Visitor = require('../models/visitorModel');

exports.getAllVisitors = factory.getAll(Visitor);
exports.createVisitor = factory.createOne(Visitor);
