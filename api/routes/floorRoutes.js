const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const floorController = require('../controllers/floorController');

const router = express.Router();

router
  .route('/')
  .get(floorController.getAllFloors)
  .post(
    authMiddleware.checkLoggedUser,
    authMiddleware.routeGuard('admin', 'owner'),
    floorController.createFloor
  );

router
  .route('/:id')
  .get(floorController.getFloor)
  .patch(
    authMiddleware.checkLoggedUser,
    authMiddleware.routeGuard('admin', 'owner'),
    floorController.updateFloor
  )
  .delete(
    authMiddleware.checkLoggedUser,
    authMiddleware.routeGuard('admin', 'owner'),
    floorController.deleteFloor
  );

module.exports = router;
