import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import HutModel from '../models/hutModel';

class HutController {
    async createHut(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const data = req.body;

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

            // Create the hut
            const hut = await HutModel.create(mountainId, data);
            res.status(201).json(hut);
        } catch (error) {
            next(error);
        }
    }

    async getHut(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, hutId } = req.params;

            // Validate mountainId and hutId
            if (!mountainId || !hutId) {
                res.status(400).json({ message: 'Mountain ID and Hut ID are required' });
                return;
            }

            // Check if the hut exists
            const hut = await HutModel.findByIdAndMountain(hutId, mountainId);
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

            // Validate mountainId
            if (!mountainId) {
                res.status(400).json({ message: 'Mountain ID is required' });
                return;
            }

            // Get all huts for the mountain
            const huts = await HutModel.findAllByMountain(mountainId);
            res.status(200).json(huts);
        } catch (error) {
            next(error);
        }
    }

    async updateHut(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, hutId } = req.params;
            const data = req.body;

            // Validate mountainId and hutId
            if (!mountainId || !hutId) {
                res.status(400).json({ message: 'Mountain ID and Hut ID are required' });
                return;
            }

            // Check if the hut exists
            const hutExists = await HutModel.findByIdAndMountain(hutId, mountainId);
            if (!hutExists) {
                res.status(404).json({ message: 'Hut not found' });
                return;
            }

            // Update the hut
            const updatedHut = await HutModel.updateById(hutId, data);
            res.status(200).json(updatedHut);
        } catch (error) {
            next(error);
        }
    }

    async deleteHut(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, hutId } = req.params;

            // Validate mountainId and hutId
            if (!mountainId || !hutId) {
                res.status(400).json({ message: 'Mountain ID and Hut ID are required' });
                return;
            }

            // Check if the hut exists
            const hutExists = await HutModel.findByIdAndMountain(hutId, mountainId);
            if (!hutExists) {
                res.status(404).json({ message: 'Hut not found' });
                return;
            }

            // Delete the hut
            const deletedHut = await HutModel.deleteById(hutId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new HutController();