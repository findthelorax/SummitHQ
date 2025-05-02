import { Request, Response, NextFunction } from 'express';
import EmployeeMountainAssignmentModel from '../models/employeeMountainAssignmentModel';

class EmployeeMountainAssignmentController {
    async createAssignment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { employeeId, mountainId } = req.body;
            const assignment = await EmployeeMountainAssignmentModel.create(employeeId, mountainId);
            res.status(201).json(assignment);
        } catch (error) {
            next(error);
        }
    }

    async getAssignments(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const assignments = await EmployeeMountainAssignmentModel.findAll();
            res.status(200).json(assignments);
        } catch (error) {
            next(error);
        }
    }

    async getAssignment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const assignment = await EmployeeMountainAssignmentModel.findById(id);
            if (!assignment) {
                res.status(404).json({ message: 'Assignment not found' });
                return;
            }
            res.status(200).json(assignment);
        } catch (error) {
            next(error);
        }
    }

    async updateAssignment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const updatedAssignment = await EmployeeMountainAssignmentModel.update(id, updatedData);
            if (!updatedAssignment) {
                res.status(404).json({ message: 'Assignment not found' });
                return;
            }
            res.status(200).json(updatedAssignment);
        } catch (error) {
            next(error);
        }
    }

    async deleteAssignment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const deleted = await EmployeeMountainAssignmentModel.delete(id);
            if (!deleted) {
                res.status(404).json({ message: 'Assignment not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new EmployeeMountainAssignmentController();