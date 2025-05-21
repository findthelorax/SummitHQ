import { Request, Response } from 'express';
import { prisma } from '../../config/database.js';
import LiftModel from '../../models/mountains/liftModel.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';
import STATUS from '../../../../shared/types/enums.js';

class LiftController {
    createLift = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId } = req.params;
        const data = req.body;

        if (!mountainId) {
            res.status(400).json({ message: 'Mountain ID is required' });
            return;
        }

        const mountainExists = await prisma.mountain.findUnique({
            where: { id: mountainId },
        });
        if (!mountainExists) {
            res.status(404).json({ message: 'Mountain not found' });
        }
        
        const lift = await LiftModel.create(mountainId, data);
        res.status(201).json(lift);
        return;
    });

    getLift = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, liftId } = req.params;

        if (!mountainId || !liftId) {
            res.status(400).json({ message: 'Mountain ID and Lift ID are required' });
            return;
        }

        const lift = await LiftModel.findByIdAndMountain(liftId, mountainId);
        if (!lift) {
            res.status(404).json({ message: 'Lift not found' });
            return;
        }

        res.status(200).json(lift);
    });

    getLifts = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId } = req.params;

        if (!mountainId) {
            res.status(400).json({ message: 'Mountain ID is required' });
            return;
        }

        const lifts = await LiftModel.findAllByMountain(mountainId);
        res.status(200).json(lifts);
    });

    updateLift = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, liftId } = req.params;
        const data = req.body;

        if (!mountainId || !liftId) {
            res.status(400).json({ message: 'Mountain ID and Lift ID are required' });
            return;
        }

        const liftExists = await LiftModel.findByIdAndMountain(liftId, mountainId);
        if (!liftExists) {
            res.status(404).json({ message: 'Lift not found' });
            return;
        }

        const updatedLift = await LiftModel.updateById(liftId, data);
        res.status(200).json(updatedLift);
    });

    deleteLift = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, liftId } = req.params;

        if (!mountainId || !liftId) {
            res.status(400).json({ message: 'Mountain ID and Lift ID are required' });
            return;
        }

        const liftExists = await LiftModel.findByIdAndMountain(liftId, mountainId);
        if (!liftExists) {
            res.status(404).json({ message: 'Lift not found' });
            return;
        }

        await LiftModel.deleteById(liftId);
        res.status(204).send();
    });
}

export default new LiftController();