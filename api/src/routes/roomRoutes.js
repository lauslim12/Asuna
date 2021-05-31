const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roomController = require('../controllers/roomController');
const roomMiddleware = require('../middlewares/roomMiddleware');

const router = express.Router();

router
  .route('/')
  .get(roomController.getAllRooms)
  .post(
    authMiddleware.checkLoggedUser,
    authMiddleware.routeGuard('owner'),
    roomController.uploadRoomImages,
    roomMiddleware.resizeRoomImages,
    roomController.createRoom
  );

router
  .route('/:id')
  .get(roomController.getRoom)
  .patch(
    authMiddleware.checkLoggedUser,
    authMiddleware.routeGuard('admin', 'owner'),
    roomController.uploadRoomImages,
    roomMiddleware.resizeRoomImages,
    roomController.updateRoom
  )
  .delete(
    authMiddleware.checkLoggedUser,
    authMiddleware.routeGuard('owner'),
    roomController.deleteRoom
  );

router.route('/view/:slug').get(roomController.showRoom);

module.exports = router;
