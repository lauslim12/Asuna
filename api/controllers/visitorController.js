const factory = require('../utils/handlerFactory');
const Visitor = require('../models/visitorModel');

exports.createVisitor = factory.createOne(Visitor);
