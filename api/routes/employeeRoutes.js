const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

router.use(
  authMiddleware.checkLoggedUser,
  authMiddleware.routeGuard('admin', 'owner')
);

router
  .route('/')
  .get(employeeController.getAllEmployees)
  .post(employeeController.createEmployee);

router
  .route('/:id')
  .get(employeeController.getEmployee)
  .patch(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

router.post('/make-employee', employeeController.makeEmployee);

module.exports = router;
