import { Request, Response, NextFunction } from 'express';
import HutModel from '../models/hutModel';

class HutController {
    async createHut(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const data = req.body;
            const hut = await HutModel.create(mountainId, data);
            res.status(201).json(hut);
        } catch (error) {
            next(error);
        }
    }

    async getHut(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const hut = await HutModel.findById(id);
            if (!hut) {
                res.status(404).json({ message: 'Hut not found' });
                return;
            }
            res.status(200).json(hut);
        } catch (error) {
            next(error);
        }
    }

    async getHuts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const huts = await HutModel.findAllByMountain(mountainId);
            res.status(200).json(huts);
        } catch (error) {
            next(error);
        }
    }

    async updateHut(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedHut = await HutModel.update(id, data);
            if (!updatedHut) {
                res.status(404).json({ message: 'Hut not found' });
                return;
            }
            res.status(200).json(updatedHut);
        } catch (error) {
            next(error);
        }
    }

    async deleteHut(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const deletedHut = await HutModel.delete(id);
            if (!deletedHut) {
                res.status(404).json({ message: 'Hut not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new HutController();