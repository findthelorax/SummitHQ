import { Request, Response, NextFunction } from 'express';
import TrailCheckModel from '../../models/logs/trailCheckModel';

class TrailCheckController {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, trailId } = req.params;
            const data = { ...req.body, mountainId, trailId };
            const result = await TrailCheckModel.create(data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, trailId } = req.params;
            const result = await TrailCheckModel.findAllByMountainAndTrail(mountainId, trailId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, trailId, trailCheckId } = req.params;
            const result = await TrailCheckModel.findByIdAndMountainAndTrail(trailCheckId, mountainId, trailId);
            if (!result) {
                res.status(404).json({ message: 'TrailCheck not found' });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, trailId, trailCheckId } = req.params;
            const updatedData = req.body;
            const result = await TrailCheckModel.updateByIdAndMountainAndTrail(trailCheckId, mountainId, trailId, updatedData);
            if (!result) {
                res.status(404).json({ message: 'TrailCheck not found' });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, trailId, trailCheckId } = req.params;
            const result = await TrailCheckModel.deleteByIdAndMountainAndTrail(trailCheckId, mountainId, trailId);
            if (!result) {
                res.status(404).json({ message: 'TrailCheck not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new TrailCheckController();