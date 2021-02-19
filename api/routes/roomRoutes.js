const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roomController = require('../controllers/roomController');

const router = express.Router();

router
  .route('/')
  .get(roomController.getAllRooms)
  .post(
    authMiddleware.checkLoggedUser,
    authMiddleware.routeGuard('admin', 'owner'),
    roomController.createRoom
  );

router
  .route('/:id')
  .get(roomController.getRoom)
  .patch(
    authMiddleware.checkLoggedUser,
    authMiddleware.routeGuard('admin', 'owner'),
    roomController.updateRoom
  )
  .delete(
    authMiddleware.checkLoggedUser,
    authMiddleware.routeGuard('admin', 'owner'),
    roomController.deleteRoom
  );

router.route('/view/:slug').get(roomController.showRoom);

module.exports = router;
