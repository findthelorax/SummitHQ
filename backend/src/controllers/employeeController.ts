import { Request, Response, NextFunction } from 'express';
import Employee from '../models/employeeModel';

class EmployeeController {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const data = req.body;
            const employee = await Employee.create(mountainId, data);
            res.status(201).json(employee);
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const employee = await Employee.findById(id);
            if (!employee) {
                res.status(404).json({ message: 'Employee not found' });
                return;
            }
            res.status(200).json(employee);
        } catch (error) {
            next(error);
        }
    }

    async findAllByMountainId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const employees = await Employee.findAllByMountain(mountainId);
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
}

export default new EmployeeController();