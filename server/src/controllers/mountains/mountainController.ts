import { Request, Response } from 'express';
import MountainModel from '../../models/mountains/mountainModel.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class MountainController {
    createMountain = asyncWrapper(async (req: Request, res: Response) => {
        const mountainData = req.body;
        const mountain = await MountainModel.create(mountainData);
        res.status(201).json(mountain);
    });

    getAllMountains = asyncWrapper(async (req: Request, res: Response) => {
        const mountains = await MountainModel.findAll();
        res.status(200).json(mountains);
    });

    getMountain = asyncWrapper(async (req: Request, res: Response) => {
        const mountainId = req.params.mountainId;
        const mountain = await MountainModel.findById(mountainId);
        if (!mountain) {
            res.status(404).json({ message: 'Mountain not found' });
            return;
        }
        res.status(200).json(mountain);
    });

    updateMountain = asyncWrapper(async (req: Request, res: Response) => {
        const mountainId = req.params.mountainId;
        const mountainData = req.body;
        const updatedMountain = await MountainModel.update(mountainId, mountainData);
        if (!updatedMountain) {
            res.status(404).json({ message: 'Mountain not found' });
            return;
        }
        res.status(200).json(updatedMountain);
    });

    deleteMountain = asyncWrapper(async (req: Request, res: Response) => {
        const mountainId = req.params.mountainId;
        const deletedMountain = await MountainModel.delete(mountainId);
        if (!deletedMountain) {
            res.status(404).json({ message: 'Mountain not found' });
            return;
        }
        res.status(204).send();
    });

    deleteAllMountains = asyncWrapper(async (req: Request, res: Response) => {
        await MountainModel.deleteAll();
        res.status(204).send();
    });
}

export default new MountainController();