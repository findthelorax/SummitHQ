import { Request, Response } from 'express';
import { prisma } from '../../config/database.js';
import TrailModel from '../../models/mountains/trailModel.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class TrailController {
    createTrail = asyncWrapper(async (req: Request, res: Response) => {
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
    });

    getTrail = asyncWrapper(async (req: Request, res: Response) => {
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
    });

    getTrails = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId } = req.params;

        if (!mountainId) {
            res.status(400).json({ message: 'Mountain ID is required' });
            return;
        }

        const trails = await TrailModel.findAllByMountain(mountainId);
        res.status(200).json(trails);
    });

    updateTrail = asyncWrapper(async (req: Request, res: Response) => {
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
    });

    deleteTrail = asyncWrapper(async (req: Request, res: Response) => {
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

        await TrailModel.deleteById(trailId);
        res.status(204).send();
    });
}

export default new TrailController();