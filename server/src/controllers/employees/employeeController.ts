import { Request, Response, NextFunction } from 'express';
import Employee from '../../models/employees/employeeModel.js';
import { prisma } from '../../config/database.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class EmployeeController {
    create = asyncWrapper(async (req: Request, res: Response) => {
        const data = req.body;
        const employee = await Employee.create(data);
        res.status(201).json(employee);
    });

    assignToMountain = asyncWrapper(async (req: Request, res: Response) => {
        const { employeeId, mountainId } = req.body;
        const assignment = await Employee.assignToMountain(employeeId, mountainId);
        res.status(200).json(assignment);
    });

    getEmployeesByMountain = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId } = req.params;

        if (!mountainId) {
            res.status(400).json({ message: 'Mountain ID is required' });
            return;
        }

        const assignments = await prisma.employeeMountainAssignment.findMany({
            where: { mountainId },
            include: { employee: true },
        });

        const employees = assignments.map(a => a.employee);

        res.status(200).json(employees);
    });

    findById = asyncWrapper(async (req: Request, res: Response) => {
        const { employeeId } = req.params;
        const employee = await Employee.findById(employeeId);
        res.status(200).json(employee);
    });

    findAll = asyncWrapper(async (_req: Request, res: Response) => {
        const employees = await Employee.findAll();
        res.status(200).json(employees);
    });

    update = asyncWrapper(async (req: Request, res: Response) => {
        const { employeeId } = req.params;
        const updatedData = req.body;
        const employee = await Employee.update(employeeId, updatedData);
        res.status(200).json(employee);
    });

    delete = asyncWrapper(async (req: Request, res: Response) => {
        const { employeeId } = req.params;
        await Employee.delete(employeeId);
        res.status(204).send();
    });

    createRole = asyncWrapper(async (req: Request, res: Response) => {
        const data = req.body;
        const role = await Employee.createRole(data);
        res.status(201).json(role);
    });

    getAllRoles = asyncWrapper(async (_req: Request, res: Response) => {
        const roles = await Employee.getAllRoles();
        res.status(200).json(roles);
    });

    getRoleById = asyncWrapper(async (req: Request, res: Response) => {
        const { roleId } = req.params;
        const role = await Employee.getRoleById(roleId);
        res.status(200).json(role);
    });

    updateRole = asyncWrapper(async (req: Request, res: Response) => {
        const { roleId } = req.params;
        const updatedData = req.body;
        const role = await Employee.updateRole(roleId, updatedData);
        res.status(200).json(role);
    });

    deleteRole = asyncWrapper(async (req: Request, res: Response) => {
        const { roleId } = req.params;
        await Employee.deleteRole(roleId);
        res.status(204).send();
    });

    addRoleToEmployee = asyncWrapper(async (req: Request, res: Response) => {
        const { employeeId } = req.params;
        const { roleId } = req.body;
        const role = await Employee.addRoleToEmployee(employeeId, roleId);
        res.status(200).json(role);
    });

    getEmployeeRoles = asyncWrapper(async (req: Request, res: Response) => {
        const { employeeId } = req.params;
        const roles = await Employee.getEmployeeRoles(employeeId);
        res.status(200).json(roles);
    });

    updateEmployeeRoles = asyncWrapper(async (req: Request, res: Response) => {
        const { employeeId, roleId } = req.params;
        const newRoleID = req.body;
        const role = await Employee.updateEmployeeRoles(employeeId, roleId, newRoleID);
        res.status(200).json(role);
    });

    removeRoleFromEmployee = asyncWrapper(async (req: Request, res: Response) => {
        const { employeeId, roleId } = req.params;
        await Employee.removeRoleFromEmployee(employeeId, roleId);
        res.status(204).send();
    });
}

export default new EmployeeController();