import { Request, Response, NextFunction } from 'express';
import TrailModel from '../models/trailModel';

class TrailController {
    async createTrail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const trailData = req.body;
            const trail = await TrailModel.create(mountainId, trailData);
            res.status(201).json(trail);
        } catch (error) {
            next(error);
        }
    }

    async getTrail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const trail = await TrailModel.findById(id);
            if (!trail) {
                res.status(404).json({ message: 'Trail not found' });
                return;
            }
            res.status(200).json(trail);
        } catch (error) {
            next(error);
        }
    }

    async getTrails(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const trails = await TrailModel.findAllByMountain(mountainId);
            res.status(200).json(trails);
        } catch (error) {
            next(error);
        }
    }

    async updateTrail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const trailData = req.body;
            const updatedTrail = await TrailModel.update(id, trailData);
            if (!updatedTrail) {
                res.status(404).json({ message: 'Trail not found' });
                return;
            }
            res.status(200).json(updatedTrail);
        } catch (error) {
            next(error);
        }
    }

    async deleteTrail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const deletedTrail = await TrailModel.delete(id);
            if (!deletedTrail) {
                res.status(404).json({ message: 'Trail not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new TrailController();