import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import TrailModel from '../models/trailModel';

class TrailController {
    async createTrail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const trailData = req.body;

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

            // Create the trail
            const trail = await TrailModel.create(mountainId, trailData);
            res.status(201).json(trail);
        } catch (error) {
            next(error);
        }
    }

    async getTrail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, trailId } = req.params;

            // Validate mountainId and trailId
            if (!mountainId || !trailId) {
                res.status(400).json({ message: 'Mountain ID and Trail ID are required' });
                return;
            }

            // Check if the trail exists
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

            // Validate mountainId
            if (!mountainId) {
                res.status(400).json({ message: 'Mountain ID is required' });
                return;
            }

            // Get all trails for the mountain
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

            // Validate mountainId and trailId
            if (!mountainId || !trailId) {
                res.status(400).json({ message: 'Mountain ID and Trail ID are required' });
                return;
            }

            // Check if the trail exists
            const trailExists = await TrailModel.findByIdAndMountain(trailId, mountainId);
            if (!trailExists) {
                res.status(404).json({ message: 'Trail not found' });
                return;
            }

            // Update the trail
            const updatedTrail = await TrailModel.updateById(trailId, trailData);
            res.status(200).json(updatedTrail);
        } catch (error) {
            next(error);
        }
    }

    async deleteTrail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, trailId } = req.params;

            // Validate mountainId and trailId
            if (!mountainId || !trailId) {
                res.status(400).json({ message: 'Mountain ID and Trail ID are required' });
                return;
            }

            // Check if the trail exists
            const trailExists = await TrailModel.findByIdAndMountain(trailId, mountainId);
            if (!trailExists) {
                res.status(404).json({ message: 'Trail not found' });
                return;
            }

            // Delete the trail
            const deletedTrail = await TrailModel.deleteById(trailId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new TrailController();