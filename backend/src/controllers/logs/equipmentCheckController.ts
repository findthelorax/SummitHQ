import { Request, Response, NextFunction } from 'express';
import EquipmentCheckModel from '../../models/logs/equipmentCheckModel';

class EquipmentCheckController {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, equipmentId } = req.params;
            const data = { ...req.body, mountainId, equipmentId };
            const result = await EquipmentCheckModel.create(data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, equipmentId } = req.params;
            const result = await EquipmentCheckModel.findAllByMountainAndEquipment(mountainId, equipmentId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, equipmentId, equipmentCheckId } = req.params;
            const result = await EquipmentCheckModel.findByIdAndMountainAndEquipment(equipmentCheckId, mountainId, equipmentId);
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
            const { mountainId, equipmentId, equipmentCheckId } = req.params;
            const updatedData = req.body;
            const result = await EquipmentCheckModel.updateByIdAndMountainAndEquipment(equipmentCheckId, mountainId, equipmentId, updatedData);
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
            const { mountainId, equipmentId, equipmentCheckId } = req.params;
            const result = await EquipmentCheckModel.deleteByIdAndMountainAndEquipment(equipmentCheckId, mountainId, equipmentId);
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