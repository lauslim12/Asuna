const express = require('express');
const roomController = require('../controllers/roomController');

const router = express.Router();

router
  .route('/')
  .get(roomController.getAllRooms)
  .post(roomController.createRoom);

router
  .route('/:id')
  .get(roomController.getRoom)
  .patch(roomController.updateRoom)
  .delete(roomController.deleteRoom);

module.exports = router;
