const factory = require('../utils/handlerFactory');
const User = require('../models/userModel');

exports.getUser = factory.getOne(User);
