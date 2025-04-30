import { Request, Response, NextFunction } from 'express';
import AidRoomModel from '../models/aidRoomModel';

class AidRoomController {
    async createAidRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const data = req.body;
            const result = await AidRoomModel.create(mountainId, data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAidRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, id } = req.params;
            const result = await AidRoomModel.findByIdAndMountain(id, mountainId);
            if (!result) {
                res.status(404).json({ message: 'AidRoom not found' });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAidRooms(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const results = await AidRoomModel.findAllByMountain(mountainId);
            res.status(200).json(results);
        } catch (error) {
            next(error);
        }
    }

    async updateAidRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, id } = req.params;
            const updatedData = req.body;
            const result = await AidRoomModel.updateByMountain(id, mountainId, updatedData);
            if (!result) {
                res.status(404).json({ message: 'AidRoom not found' });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async deleteAidRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, id } = req.params;
            const deleted = await AidRoomModel.deleteByMountain(id, mountainId);
            if (!deleted) {
                res.status(404).json({ message: 'AidRoom not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new AidRoomController();