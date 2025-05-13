import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/database';
import TrailModel from '../../models/mountains/trailModel';

class TrailController {
    async createTrail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const trailData = req.body;

            if (!mountainId) {
                res.status(400).json({ message: 'Mountain ID is required' });
                return;
            }

            const mountainExists = await prisma.mountain.findUnique({
                where: { id: mountainId },
            });
            if (!mountainExists) {
                res.status(404).json({ message: 'Mountain not found' });
                return;
            }

            const trail = await TrailModel.create(mountainId, trailData);
            res.status(201).json(trail);
        } catch (error) {
            next(error);
        }
    }

    async getTrail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, trailId } = req.params;

            if (!mountainId || !trailId) {
                res.status(400).json({ message: 'Mountain ID and Trail ID are required' });
                return;
            }

            const trail = await TrailModel.findByIdAndMountain(trailId, mountainId);
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

            if (!mountainId) {
                res.status(400).json({ message: 'Mountain ID is required' });
                return;
            }

            const trails = await TrailModel.findAllByMountain(mountainId);
            res.status(200).json(trails);
        } catch (error) {
            next(error);
        }
    }

    async updateTrail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, trailId } = req.params;
            const trailData = req.body;

            if (!mountainId || !trailId) {
                res.status(400).json({ message: 'Mountain ID and Trail ID are required' });
                return;
            }

            const trailExists = await TrailModel.findByIdAndMountain(trailId, mountainId);
            if (!trailExists) {
                res.status(404).json({ message: 'Trail not found' });
                return;
            }

            const updatedTrail = await TrailModel.updateById(trailId, trailData);
            res.status(200).json(updatedTrail);
        } catch (error) {
            next(error);
        }
    }

    async deleteTrail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, trailId } = req.params;

            if (!mountainId || !trailId) {
                res.status(400).json({ message: 'Mountain ID and Trail ID are required' });
                return;
            }

            const trailExists = await TrailModel.findByIdAndMountain(trailId, mountainId);
            if (!trailExists) {
                res.status(404).json({ message: 'Trail not found' });
                return;
            }

            const deletedTrail = await TrailModel.deleteById(trailId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new TrailController();