import { Request, Response, NextFunction } from 'express';
import AidRoomCheckModel from '../../models/logs/aidRoomCheckModel';

class AidRoomCheckController {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body;
            const result = await AidRoomCheckModel.create(data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await AidRoomCheckModel.findAll();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const result = await AidRoomCheckModel.findById(id);
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
            const { id } = req.params;
            const updatedData = req.body;
            const result = await AidRoomCheckModel.updateById(id, updatedData);
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
            const { id } = req.params;
            const result = await AidRoomCheckModel.deleteById(id);
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