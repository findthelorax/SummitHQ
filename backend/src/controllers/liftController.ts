import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import LiftModel from '../models/liftModel';

class LiftController {
    async createLift(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const data = req.body;

            // Validate mountainId
            if (!mountainId) {
                res.status(400).json({ message: 'Mountain ID is required' });
                return;
            }

            // Check if the mountain exists
            const mountainExists = await prisma.mountain.findUnique({
                where: { id: mountainId },
            });
            if (!mountainExists) {
                res.status(404).json({ message: 'Mountain not found' });
                return;
            }

            // Create the lift
            const lift = await LiftModel.create(mountainId, data);
            res.status(201).json(lift);
        } catch (error) {
            next(error);
        }
    }

    async getLift(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, liftId } = req.params;

            // Validate mountainId and liftId
            if (!mountainId || !liftId) {
                res.status(400).json({ message: 'Mountain ID and Lift ID are required' });
                return;
            }

            // Check if the lift exists
            const lift = await LiftModel.findByIdAndMountain(liftId, mountainId);
            if (!lift) {
                res.status(404).json({ message: 'Lift not found' });
                return;
            }

            res.status(200).json(lift);
        } catch (error) {
            next(error);
        }
    }

    async getLifts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;

            // Validate mountainId
            if (!mountainId) {
                res.status(400).json({ message: 'Mountain ID is required' });
                return;
            }

            // Get all lifts for the mountain
            const lifts = await LiftModel.findAllByMountain(mountainId);
            res.status(200).json(lifts);
        } catch (error) {
            next(error);
        }
    }

    async updateLift(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, liftId } = req.params;
            const data = req.body;

            // Validate mountainId and liftId
            if (!mountainId || !liftId) {
                res.status(400).json({ message: 'Mountain ID and Lift ID are required' });
                return;
            }

            // Check if the lift exists
            const liftExists = await LiftModel.findByIdAndMountain(liftId, mountainId);
            if (!liftExists) {
                res.status(404).json({ message: 'Lift not found' });
                return;
            }

            // Update the lift
            const updatedLift = await LiftModel.updateById(liftId, data);
            res.status(200).json(updatedLift);
        } catch (error) {
            next(error);
        }
    }

    async deleteLift(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, liftId } = req.params;

            // Validate mountainId and liftId
            if (!mountainId || !liftId) {
                res.status(400).json({ message: 'Mountain ID and Lift ID are required' });
                return;
            }

            // Check if the lift exists
            const liftExists = await LiftModel.findByIdAndMountain(liftId, mountainId);
            if (!liftExists) {
                res.status(404).json({ message: 'Lift not found' });
                return;
            }

            // Delete the lift
            const deletedLift = await LiftModel.deleteById(liftId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new LiftController();