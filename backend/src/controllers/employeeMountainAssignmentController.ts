import { Request, Response, NextFunction } from 'express';
import EmployeeMountainAssignmentModel from '../models/employeeMountainAssignmentModel';
import { prisma } from '../config/database';

class EmployeeMountainAssignmentController {
    async createAssignment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { employeeId } = req.params;
            const { mountainId } = req.body;

            if (!mountainId) {
                res.status(400).json({ message: 'Mountain ID is required' });
                return;
            }

            const employeeExists = await prisma.employee.findUnique({
                where: { id: employeeId },
            });
            if (!employeeExists) {
                res.status(404).json({ message: 'Employee not found' });
                return;
            }

            const mountainExists = await prisma.mountain.findUnique({
                where: { id: mountainId },
            });
            if (!mountainExists) {
                res.status(404).json({ message: 'Mountain not found' });
                return;
            }

            const assignedAt = new Date();
            const assignment = await EmployeeMountainAssignmentModel.create(employeeId, mountainId, assignedAt);
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
            const { employeeId, mountainAssignmentId } = req.params;

            if (!employeeId || !mountainAssignmentId) {
                res.status(400).json({ message: 'Employee ID and Assignment ID are required' });
                return;
            }

            const assignment = await prisma.employeeMountainAssignment.findFirst({
                where: {
                    id: mountainAssignmentId,
                    employeeId: employeeId,
                },
            });

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
            const { employeeId, mountainAssignmentId } = req.params;
            const updatedData = req.body;

            if (!employeeId || !mountainAssignmentId) {
                res.status(400).json({ message: 'Employee ID and Assignment ID are required' });
                return;
            }

            const updatedAssignment = await prisma.employeeMountainAssignment.updateMany({
                where: {
                    id: mountainAssignmentId,
                    employeeId: employeeId,
                },
                data: updatedData,
            });

            if (updatedAssignment.count === 0) {
                res.status(404).json({ message: 'Assignment not found' });
                return;
            }

            res.status(200).json({ message: 'Assignment updated successfully' });
        } catch (error) {
            next(error);
        }
    }

    async deleteAssignment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { employeeId, mountainAssignmentId } = req.params;

            if (!employeeId || !mountainAssignmentId) {
                res.status(400).json({ message: 'Employee ID and Assignment ID are required' });
                return;
            }

            const deletedAssignment = await prisma.employeeMountainAssignment.deleteMany({
                where: {
                    id: mountainAssignmentId,
                    employeeId: employeeId,
                },
            });

            if (deletedAssignment.count === 0) {
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