import { Request, Response, NextFunction } from 'express';
import AidRoomCheckModel from '../../models/logs/aidRoomCheckModel';

class AidRoomCheckController {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, aidRoomId } = req.params;
            const data = { ...req.body, mountainId, aidRoomId };
            const result = await AidRoomCheckModel.create(data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, aidRoomId } = req.params;
            const result = await AidRoomCheckModel.findAllByMountainAndAidRoom(mountainId, aidRoomId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, aidRoomId, aidRoomCheckId } = req.params;
            const result = await AidRoomCheckModel.findByIdAndMountainAndAidRoom(aidRoomCheckId, mountainId, aidRoomId);
            if (!result) {
                res.status(404).json({ message: 'AidRoomCheck not found' });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, aidRoomId, aidRoomCheckId } = req.params;
            const updatedData = req.body;
            const result = await AidRoomCheckModel.updateByIdAndMountainAndAidRoom(aidRoomCheckId, mountainId, aidRoomId, updatedData);
            if (!result) {
                res.status(404).json({ message: 'AidRoomCheck not found' });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, aidRoomId, aidRoomCheckId } = req.params;
            const result = await AidRoomCheckModel.deleteByIdAndMountainAndAidRoom(aidRoomCheckId, mountainId, aidRoomId);
            if (!result) {
                res.status(404).json({ message: 'AidRoomCheck not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new AidRoomCheckController();