const mongoose = require('mongoose');

const floorSchema = new mongoose.Schema({
  number: {
    type: Number,
    unique: true,
    required: [true, 'A floor must have a number!'],
  },
  name: {
    type: String,
    required: [true, 'A floor must have a name!'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  },
});

const Floor = mongoose.model('Floor', floorSchema);

module.exports = Floor;
