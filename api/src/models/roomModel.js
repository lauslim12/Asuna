const mongoose = require('mongoose');
const slugify = require('slugify');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A room must have a name!'],
    unique: true,
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
  roomFeatures: {
    type: [String],
    required: [true, 'A room must have its features!'],
  },
  thumbnail: {
    type: String,
    default: 'thumbnail-placeholder.jpg',
  },
  photos: {
    type: [String],
    required: [true, 'A room must have its pictures!'],
  },
  price: {
    type: Number,
    required: [true, 'A room must have a price!'],
  },
  type: {
    type: String,
    enum: ['office', 'coworking-space'],
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  },
  floor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Floor',
    required: [true, 'A room must have a floor!'],
  },
});

roomSchema.index({ name: 1, slug: 1 });

roomSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

roomSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'floor',
    select: 'name number',
  });

  next();
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
