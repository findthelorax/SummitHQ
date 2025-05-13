import { Request, Response, NextFunction } from 'express';
import HutCheckModel from '../../models/logs/hutCheckModel';

class HutCheckController {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, hutId } = req.params;
            const data = { ...req.body, mountainId, hutId };
            const result = await HutCheckModel.create(data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, hutId } = req.params;
            const result = await HutCheckModel.findAllByMountainAndHut(mountainId, hutId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, hutId, hutCheckId } = req.params;
            const result = await HutCheckModel.findByIdAndMountainAndHut(hutCheckId, mountainId, hutId);
            if (!result) {
                res.status(404).json({ message: 'HutCheck not found' });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, hutId, hutCheckId } = req.params;
            const updatedData = req.body;
            const result = await HutCheckModel.updateByIdAndMountainAndHut(hutCheckId, mountainId, hutId, updatedData);
            if (!result) {
                res.status(404).json({ message: 'HutCheck not found' });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, hutId, hutCheckId } = req.params;
            const result = await HutCheckModel.deleteByIdAndMountainAndHut(hutCheckId, mountainId, hutId);
            if (!result) {
                res.status(404).json({ message: 'HutCheck not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new HutCheckController();