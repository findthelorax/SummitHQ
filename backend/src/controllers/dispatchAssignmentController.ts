import { Request, Response, NextFunction } from 'express';
import AssignModel from '../models/dispatchAssignmentModel';

class AssignController {
    async createAssignment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { employeeId, mountainId } = req.body;
            const assignment = await AssignModel.create(employeeId, mountainId);
            res.status(201).json(assignment);
        } catch (error) {
            next(error);
        }
    }

    async getAssignments(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const assignments = await AssignModel.findAll();
            res.status(200).json(assignments);
        } catch (error) {
            next(error);
        }
    }

    async getAssignment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const assignment = await AssignModel.findById(id);
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
            const updatedAssignment = await AssignModel.update(id, updatedData);
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
            const deleted = await AssignModel.delete(id);
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

export default new AssignController();