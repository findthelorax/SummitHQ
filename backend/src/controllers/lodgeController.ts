import { Request, Response, NextFunction } from 'express';
import LodgeModel from '../models/lodgeModel';

class LodgeController {
    async createLodge(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const data = req.body;
            const lodge = await LodgeModel.create(mountainId, data);
            res.status(201).json(lodge);
        } catch (error) {
            next(error);
        }
    }

    async getLodge(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, id } = req.params;
            const result = await LodgeModel.findByIdAndMountain(id, mountainId);
            if (!result) {
                res.status(404).json({ message: 'Lodge not found' });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getLodges(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const lodges = await LodgeModel.findAllByMountain(mountainId);
            res.status(200).json(lodges);
        } catch (error) {
            next(error);
        }
    }

    async updateLodge(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, id } = req.params;
            const data = req.body;
            const result = await LodgeModel.updateByMountain(id, mountainId, data);
            if (!result) {
                res.status(404).json({ message: 'Lodge not found' });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async deleteLodge(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, id } = req.params;
            const deleted = await LodgeModel.deleteByMountain(id, mountainId);
            if (!deleted) {
                res.status(404).json({ message: 'Lodge not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new LodgeController();