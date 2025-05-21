import { Request, Response } from 'express';
import { prisma } from '../../config/database.js';
import HutModel from '../../models/mountains/hutModel.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class HutController {
    createHut = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId } = req.params;
        const data = req.body;

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

        const hut = await HutModel.create(mountainId, data);
        res.status(201).json(hut);
    });

    getHut = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, hutId } = req.params;

        if (!mountainId || !hutId) {
            res.status(400).json({ message: 'Mountain ID and Hut ID are required' });
            return;
        }

        const hut = await HutModel.findByIdAndMountain(hutId, mountainId);
        if (!hut) {
            res.status(404).json({ message: 'Hut not found' });
            return;
        }

        res.status(200).json(hut);
    });

    getHuts = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId } = req.params;

        if (!mountainId) {
            res.status(400).json({ message: 'Mountain ID is required' });
            return;
        }

        const huts = await HutModel.findAllByMountain(mountainId);
        res.status(200).json(huts);
    });

    updateHut = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, hutId } = req.params;
        const data = req.body;

        if (!mountainId || !hutId) {
            res.status(400).json({ message: 'Mountain ID and Hut ID are required' });
            return;
        }

        const hutExists = await HutModel.findByIdAndMountain(hutId, mountainId);
        if (!hutExists) {
            res.status(404).json({ message: 'Hut not found' });
            return;
        }

        const updatedHut = await HutModel.updateById(hutId, data);
        res.status(200).json(updatedHut);
    });

    deleteHut = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, hutId } = req.params;

        if (!mountainId || !hutId) {
            res.status(400).json({ message: 'Mountain ID and Hut ID are required' });
            return;
        }

        const hutExists = await HutModel.findByIdAndMountain(hutId, mountainId);
        if (!hutExists) {
            res.status(404).json({ message: 'Hut not found' });
            return;
        }

        await HutModel.deleteById(hutId);
        res.status(204).send();
    });
}

export default new HutController();