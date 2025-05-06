import { Request, Response, NextFunction } from 'express';
import Employee from '../models/employeeModel';

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
            const { id } = req.params;
            const employee = await Employee.findById(id);
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
            const { id } = req.params;
            const updatedData = req.body;
            const employee = await Employee.update(id, updatedData);
            res.status(200).json(employee);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            await Employee.delete(id);
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
            const { roleID } = req.params;
            const role = await Employee.getRoleById(roleID);
            res.status(200).json(role);
        } catch (error) {
            next(error);
        }
    }

    async updateRole(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { roleID } = req.params;
            const updatedData = req.body;
            const role = await Employee.updateRole(roleID, updatedData);
            res.status(200).json(role);
        } catch (error) {
            next(error);
        }
    }

    async deleteRole(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { roleID } = req.params;
            await Employee.deleteRole(roleID);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async addRoleToEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { employeeID } = req.params;
            const { roleId } = req.body;
            const role = await Employee.addRoleToEmployee(employeeID, roleId);
            res.status(200).json(role);
        } catch (error) {
            next(error);
        }
    }

    async getEmployeeRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { employeeID } = req.params;
            const roles = await Employee.getEmployeeRoles(employeeID);
            res.status(200).json(roles);
        } catch (error) {
            next(error);
        }
    }

    async updateEmployeeRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { employeeID, roleID } = req.params;
            const newRoleID = req.body;
            const role = await Employee.updateEmployeeRoles(employeeID, roleID, newRoleID);
            res.status(200).json(role);
        } catch (error) {
            next(error);
        }
    }

    async removeRoleFromEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { employeeID, roleID } = req.params;
            const deleted = await Employee.removeRoleFromEmployee(employeeID, roleID);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new EmployeeController();