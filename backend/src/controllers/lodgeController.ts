import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import LodgeModel from '../models/lodgeModel';

class LodgeController {
    async createLodge(req: Request, res: Response, next: NextFunction): Promise<void> {
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

            // Create the lodge
            const lodge = await LodgeModel.create(mountainId, data);
            res.status(201).json(lodge);
        } catch (error) {
            next(error);
        }
    }

    async getLodge(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, lodgeId } = req.params;

            // Validate mountainId and lodgeId
            if (!mountainId || !lodgeId) {
                res.status(400).json({ message: 'Mountain ID and Lodge ID are required' });
                return;
            }

            // Check if the lodge exists
            const lodge = await LodgeModel.findByIdAndMountain(lodgeId, mountainId);
            if (!lodge) {
                res.status(404).json({ message: 'Lodge not found' });
                return;
            }

            res.status(200).json(lodge);
        } catch (error) {
            next(error);
        }
    }

    async getLodges(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;

            // Validate mountainId
            if (!mountainId) {
                res.status(400).json({ message: 'Mountain ID is required' });
                return;
            }

            // Get all lodges for the mountain
            const lodges = await LodgeModel.findAllByMountain(mountainId);
            res.status(200).json(lodges);
        } catch (error) {
            next(error);
        }
    }

    async updateLodge(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, lodgeId } = req.params;
            const data = req.body;

            // Validate mountainId and lodgeId
            if (!mountainId || !lodgeId) {
                res.status(400).json({ message: 'Mountain ID and Lodge ID are required' });
                return;
            }

            // Check if the lodge exists
            const lodgeExists = await LodgeModel.findByIdAndMountain(lodgeId, mountainId);
            if (!lodgeExists) {
                res.status(404).json({ message: 'Lodge not found' });
                return;
            }

            // Update the lodge
            const updatedLodge = await LodgeModel.updateById(lodgeId, data);
            res.status(200).json(updatedLodge);
        } catch (error) {
            next(error);
        }
    }

    async deleteLodge(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, lodgeId } = req.params;

            // Validate mountainId and lodgeId
            if (!mountainId || !lodgeId) {
                res.status(400).json({ message: 'Mountain ID and Lodge ID are required' });
                return;
            }

            // Check if the lodge exists
            const lodgeExists = await LodgeModel.findByIdAndMountain(lodgeId, mountainId);
            if (!lodgeExists) {
                res.status(404).json({ message: 'Lodge not found' });
                return;
            }

            // Delete the lodge
            const deletedLodge = await LodgeModel.deleteById(lodgeId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new LodgeController();