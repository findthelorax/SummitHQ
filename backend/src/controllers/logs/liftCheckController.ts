import { Request, Response, NextFunction } from 'express';
import LiftCheckModel from '../../models/logs/liftCheckModel';

class LiftCheckController {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, liftId } = req.params;
            const data = { ...req.body, mountainId, liftId };
            const result = await LiftCheckModel.create(data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, liftId } = req.params;
            const result = await LiftCheckModel.findAllByMountainAndLift(mountainId, liftId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, liftId, liftCheckId } = req.params;
            const result = await LiftCheckModel.findByIdAndMountainAndLift(liftCheckId, mountainId, liftId);
            if (!result) {
                res.status(404).json({ message: 'LiftCheck not found' });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, liftId, liftCheckId } = req.params;
            const updatedData = req.body;
            const result = await LiftCheckModel.updateByIdAndMountainAndLift(liftCheckId, mountainId, liftId, updatedData);
            if (!result) {
                res.status(404).json({ message: 'LiftCheck not found' });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    
    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, liftId, liftCheckId } = req.params;
            const result = await LiftCheckModel.deleteByIdAndMountainAndLift(liftCheckId, mountainId, liftId);
            if (!result) {
                res.status(404).json({ message: 'LiftCheck not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new LiftCheckController();