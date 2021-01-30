const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A room must have a name!'],
  },
  description: {
    type: String,
    trim: true,
    minlength: [
      5,
      'A description must consists at least five characters and less than seventy-five characters!',
    ],
    maxlength: [
      75,
      'A description must consists at least five characters and less than seventy-five characters!',
    ],
    required: [true, 'A room must have a description!'],
  },
  thumbnail: {
    type: String,
    default: 'thumbnail-placeholder.jpg',
  },
  photos: [String],
  price: {
    type: Number,
    required: [true, 'A room must have a price!'],
  },
  type: {
    type: String,
    enum: ['office', 'coworking-space'],
  },
  floor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Floor',
    required: ['A room must have a floor!'],
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

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
