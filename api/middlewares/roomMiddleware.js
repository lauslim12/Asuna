const sharp = require('sharp');
const asyncHandler = require('../utils/asyncHandler');

exports.resizeRoomImages = asyncHandler(async (req, res, next) => {
  // 0) If there is no data, next.
  if (!req.files.thumbnail && !req.files.photos) {
    return next();
  }

  // 1) Process the thumbnail.
  if (req.files.thumbnail) {
    const imageCoverFilename = `room-${
      req.params.id || req.body.name
    }-${Date.now()}-thumbnail.png`;
    await sharp(req.files.thumbnail[0].buffer)
      .resize(106, 106)
      .toFormat('png')
      .toFile(`public/images/thumbnails/${imageCoverFilename}`);

    // Remember, in the 'updateMe', we used req.file.filename because it is a dependency.
    // Here, req.body.imageCover is used to make a faux element to store it in the request variable.
    // Place in the request body.
    req.body.thumbnail = imageCoverFilename;
  }

  // 2) Process the three images asynchronously.
  if (req.files.photos) {
    req.body.photos = [];

    await Promise.all(
      req.files.photos.map(async (image, index) => {
        const filename = `room-${
          req.params.id || req.body.name
        }-${Date.now()}-${index + 1}.jpeg`;

        await sharp(image.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .toFile(`public/images/room-features/${filename}`);

        // Push the filename into the req.body array to be stored.
        req.body.photos.push(filename);
      })
    );
  }

  next();
});
