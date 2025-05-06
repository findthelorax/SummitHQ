import { Router } from 'express';
import EmployeeController from '../controllers/employeeController';

const router = Router();

// Role-related routes
router.post('/roles', EmployeeController.createRole);
router.get('/roles', EmployeeController.getAllRoles);
router.get('/roles/:roleID', EmployeeController.getRoleById);
router.put('/roles/:roleID', EmployeeController.updateRole);
router.delete('/roles/:roleID', EmployeeController.deleteRole);

// Employee-related routes
router.post('/', EmployeeController.create);
router.get('/', EmployeeController.findAll);
router.get('/:employeeID', EmployeeController.findById);
router.put('/:employeeID', EmployeeController.update);
router.delete('/:employeeID', EmployeeController.delete);

// Employee-role relationship routes
router.post('/:employeeID/roles', EmployeeController.addRoleToEmployee);
router.get('/:employeeID/roles', EmployeeController.getEmployeeRoles);
router.put('/:employeeID/roles/:roleID', EmployeeController.updateEmployeeRoles);
router.delete('/:employeeID/roles/:roleID', EmployeeController.removeRoleFromEmployee);

export default router;