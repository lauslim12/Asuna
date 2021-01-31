const express = require('express');
const floorController = require('../controllers/floorController');

const router = express.Router();

router
  .route('/')
  .get(floorController.getAllFloors)
  .post(floorController.createFloor);

router
  .route('/:id')
  .get(floorController.getFloor)
  .patch(floorController.updateFloor)
  .delete(floorController.deleteFloor);

module.exports = router;
