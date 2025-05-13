import { Request, Response, NextFunction } from 'express';
import Employee from '../../models/employees/employeeModel';

class EmployeeController {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body;
            const employee = await Employee.create(data);
            res.status(201).json(employee);
        } catch (error) {
            next(error);
        }
    }

    async assignToMountain(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { employeeId, mountainId } = req.body;
            const assignment = await Employee.assignToMountain(employeeId, mountainId);
            res.status(200).json(assignment);
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { employeeId } = req.params;
            const employee = await Employee.findById(employeeId);
            res.status(200).json(employee);
        } catch (error) {
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const employees = await Employee.findAll();
            res.status(200).json(employees);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { employeeId } = req.params;
            const updatedData = req.body;
            const employee = await Employee.update(employeeId, updatedData);
            res.status(200).json(employee);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { employeeId } = req.params;
            await Employee.delete(employeeId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async createRole(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body;
            const role = await Employee.createRole(data);
            res.status(201).json(role);
        } catch (error) {
            next(error);
        }
    }

    async getAllRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const roles = await Employee.getAllRoles();
            res.status(200).json(roles);
        } catch (error) {
            next(error);
        }
    }

    async getRoleById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { roleId } = req.params;
            const role = await Employee.getRoleById(roleId);
            res.status(200).json(role);
        } catch (error) {
            next(error);
        }
    }

    async updateRole(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { roleId } = req.params;
            const updatedData = req.body;
            const role = await Employee.updateRole(roleId, updatedData);
            res.status(200).json(role);
        } catch (error) {
            next(error);
        }
    }

    async deleteRole(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { roleId } = req.params;
            await Employee.deleteRole(roleId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async addRoleToEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { employeeId } = req.params;
            const { roleId } = req.body;
            const role = await Employee.addRoleToEmployee(employeeId, roleId);
            res.status(200).json(role);
        } catch (error) {
            next(error);
        }
    }

    async getEmployeeRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { employeeId } = req.params;
            const roles = await Employee.getEmployeeRoles(employeeId);
            res.status(200).json(roles);
        } catch (error) {
            next(error);
        }
    }

    async updateEmployeeRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { employeeId, roleId } = req.params;
            const newRoleID = req.body;
            const role = await Employee.updateEmployeeRoles(employeeId, roleId, newRoleID);
            res.status(200).json(role);
        } catch (error) {
            next(error);
        }
    }

    async removeRoleFromEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { employeeId, roleId } = req.params;
            const deleted = await Employee.removeRoleFromEmployee(employeeId, roleId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new EmployeeController();