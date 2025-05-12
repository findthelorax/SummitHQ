import { Request, Response, NextFunction } from 'express';
import MountainModel from '../models/mountainModel';

class MountainController {
    async createMountain(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const mountainData = req.body;
            const mountain = await MountainModel.create(mountainData);
            res.status(201).json(mountain);
        } catch (error) {
            next(error);
        }
    }

    async getAllMountains(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const mountains = await MountainModel.findAll();
            res.status(200).json(mountains);
        } catch (error) {
            next(error);
        }
    }
    
    async getMountain(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const mountainId = req.params.mountainId;
            const mountain = await MountainModel.findById(mountainId);
            if (!mountain) {
                res.status(404).json({ message: 'Mountain not found' });
                return;
            }
            res.status(200).json(mountain);
        } catch (error) {
            next(error);
        }
    }

    async updateMountain(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const mountainId = req.params.mountainId;
            const mountainData = req.body;
            const updatedMountain = await MountainModel.update(mountainId, mountainData);
            if (!updatedMountain) {
                res.status(404).json({ message: 'Mountain not found' });
                return;
            }
            res.status(200).json(updatedMountain);
        } catch (error) {
            next(error);
        }
    }

    async deleteMountain(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const mountainId = req.params.mountainId;
            const deletedMountain = await MountainModel.delete(mountainId);
            if (!deletedMountain) {
                res.status(404).json({ message: 'Mountain not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async deleteAllMountains(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await MountainModel.deleteAll();
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new MountainController();