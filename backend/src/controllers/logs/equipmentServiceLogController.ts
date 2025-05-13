import { Request, Response, NextFunction } from 'express';
import EquipmentServiceLogModel from '../../models/logs/equipmentServiceLogModel';

class EquipmentServiceLogController {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body;
            const result = await EquipmentServiceLogModel.create(data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await EquipmentServiceLogModel.findAll();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const result = await EquipmentServiceLogModel.findById(id);
            if (!result) {
                res.status(404).json({ message: 'EquipmentServiceLog not found' });
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
            const result = await EquipmentServiceLogModel.updateById(id, updatedData);
            if (!result) {
                res.status(404).json({ message: 'EquipmentServiceLog not found' });
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
            const result = await EquipmentServiceLogModel.deleteById(id);
            if (!result) {
                res.status(404).json({ message: 'EquipmentServiceLog not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new EquipmentServiceLogController();