const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const visitorController = require('../controllers/visitorController');

const router = express.Router();

router.use(
  authMiddleware.checkLoggedUser,
  authMiddleware.routeGuard('admin', 'owner')
);

router
  .route('/')
  .get(visitorController.getAllVisitors)
  .post(visitorController.createVisitor);

module.exports = router;
