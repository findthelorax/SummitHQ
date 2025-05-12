import { Router } from 'express';
import EmployeeController from '../../controllers/employeeController';

const router = Router();

// Role-related routes
router.post('/roles', EmployeeController.createRole);
router.get('/roles', EmployeeController.getAllRoles);
router.get('/roles/:roleId', EmployeeController.getRoleById);
router.put('/roles/:roleId', EmployeeController.updateRole);
router.delete('/roles/:roleId', EmployeeController.deleteRole);

// Employee-related routes
router.post('/', EmployeeController.create);
router.get('/', EmployeeController.findAll);
router.get('/:employeeId', EmployeeController.findById);
router.put('/:employeeId', EmployeeController.update);
router.delete('/:employeeId', EmployeeController.delete);

// Employee-role relationship routes
router.post('/:employeeId/roles', EmployeeController.addRoleToEmployee);
router.get('/:employeeId/roles', EmployeeController.getEmployeeRoles);
router.put('/:employeeId/roles/:roleId', EmployeeController.updateEmployeeRoles);
router.delete('/:employeeId/roles/:roleId', EmployeeController.removeRoleFromEmployee);

export default router;