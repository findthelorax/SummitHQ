import { Request, Response, NextFunction } from 'express';
import EquipmentCheckModel from '../../models/logs/equipmentCheckModel';

class EquipmentCheckController {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body;
            const result = await EquipmentCheckModel.create(data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await EquipmentCheckModel.findAll();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const result = await EquipmentCheckModel.findById(id);
            if (!result) {
                res.status(404).json({ message: 'EquipmentCheck not found' });
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
            const result = await EquipmentCheckModel.updateById(id, updatedData);
            if (!result) {
                res.status(404).json({ message: 'EquipmentCheck not found' });
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
            const result = await EquipmentCheckModel.deleteById(id);
            if (!result) {
                res.status(404).json({ message: 'EquipmentCheck not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new EquipmentCheckController();