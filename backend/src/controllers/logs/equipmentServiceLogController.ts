import { Request, Response, NextFunction } from 'express';
import EquipmentServiceLogModel from '../../models/logs/equipmentServiceLogModel';

class EquipmentServiceLogController {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, equipmentId } = req.params;
            const data = { ...req.body, mountainId, equipmentId };
            const result = await EquipmentServiceLogModel.create(data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, equipmentId } = req.params;
            const result = await EquipmentServiceLogModel.findAllByMountainAndEquipment(mountainId, equipmentId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, equipmentId, serviceLogId } = req.params;
            const result = await EquipmentServiceLogModel.findByIdAndMountainAndEquipment(serviceLogId, mountainId, equipmentId);
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
            const { mountainId, equipmentId, serviceLogId } = req.params;
            const updatedData = req.body;
            const result = await EquipmentServiceLogModel.updateByIdAndMountainAndEquipment(serviceLogId, mountainId, equipmentId, updatedData);
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
            const { mountainId, equipmentId, serviceLogId } = req.params;
            const result = await EquipmentServiceLogModel.deleteByIdAndMountainAndEquipment(serviceLogId, mountainId, equipmentId);
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