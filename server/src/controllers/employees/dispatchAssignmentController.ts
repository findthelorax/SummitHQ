import { Request, Response } from 'express';
import DispathcAssignmentModel from '../../models/employees/dispatchAssignmentModel.js';
import { prisma } from '../../config/database.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class DispathcAssignmentController {
    createAssignment = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
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

        const assignment = await DispathcAssignmentModel.create(employeeId, mountainId);
        res.status(201).json(assignment);
    });

    getAssignments = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
        const assignments = await DispathcAssignmentModel.findAll();
        res.status(200).json(assignments);
    });

    getAssignment = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
        const { employeeId, dispatchAssignmentId } = req.params;

        if (!employeeId || !dispatchAssignmentId) {
            res.status(400).json({ message: 'Employee ID and Assignment ID are required' });
            return;
        }

        const assignment = await prisma.dispatcherAssignment.findFirst({
            where: {
                id: dispatchAssignmentId,
                employeeId: employeeId,
            },
        });

        if (!assignment) {
            res.status(404).json({ message: 'Assignment not found' });
            return;
        }

        res.status(200).json(assignment);
    });

    updateAssignment = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
        const { employeeId, dispatchAssignmentId } = req.params;
        const updatedData = req.body;

        if (!employeeId || !dispatchAssignmentId) {
            res.status(400).json({ message: 'Employee ID and Assignment ID are required' });
            return;
        }

        const updatedAssignment = await prisma.dispatcherAssignment.updateMany({
            where: {
                id: dispatchAssignmentId,
                employeeId: employeeId,
            },
            data: updatedData,
        });

        if (updatedAssignment.count === 0) {
            res.status(404).json({ message: 'Assignment not found' });
            return;
        }

        res.status(200).json({ message: 'Assignment updated successfully' });
    });

    deleteAssignment = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
        const { employeeId, dispatchAssignmentId } = req.params;

        if (!employeeId || !dispatchAssignmentId) {
            res.status(400).json({ message: 'Employee ID and Assignment ID are required' });
            return;
        }

        const deletedAssignment = await prisma.dispatcherAssignment.deleteMany({
            where: {
                id: dispatchAssignmentId,
                employeeId: employeeId,
            },
        });

        if (deletedAssignment.count === 0) {
            res.status(404).json({ message: 'Assignment not found' });
            return;
        }

        res.status(204).send();
    });
}

export default new DispathcAssignmentController();