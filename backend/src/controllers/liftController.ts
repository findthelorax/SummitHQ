import { Request, Response, NextFunction } from 'express';
import LiftModel from '../models/liftModel';

class LiftController {
    async createLift(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const data = req.body;
            const lift = await LiftModel.create(mountainId, data);
            res.status(201).json(lift);
        } catch (error) {
            next(error);
        }
    }

    async getLift(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, id } = req.params;
            const lift = await LiftModel.findByIdAndMountain(id, mountainId);
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
            const lifts = await LiftModel.findAllByMountain(mountainId);
            res.status(200).json(lifts);
        } catch (error) {
            next(error);
        }
    }

    async updateLift(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, id } = req.params;
            const data = req.body;
            const updatedLift = await LiftModel.updateByMountain(id, mountainId, data);
            if (!updatedLift) {
                res.status(404).json({ message: 'Lift not found' });
                return;
            }
            res.status(200).json(updatedLift);
        } catch (error) {
            next(error);
        }
    }

    async deleteLift(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, id } = req.params;
            const deletedLift = await LiftModel.deleteByMountain(id, mountainId);
            if (!deletedLift) {
                res.status(404).json({ message: 'Lift not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new LiftController();