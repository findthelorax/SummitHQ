import { Request, Response, NextFunction } from 'express';
import EquipmentModel from '../models/equipmentModel';

class EquipmentController {
    async createEquipment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const data = req.body;
            const result = await EquipmentModel.create(mountainId, data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getEquipment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, id } = req.params;
            const result = await EquipmentModel.findByIdAndMountain(id, mountainId);
            if (!result) {
                res.status(404).json({ message: 'Equipment not found' });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getEquipments(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const equipment = await EquipmentModel.findAllByMountain(mountainId);
            res.status(200).json(equipment);
        } catch (error) {
            next(error);
        }
    }

    async updateEquipment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, id } = req.params;
            const updatedData = req.body;
            const result = await EquipmentModel.updateByMountain(id, mountainId, updatedData);
            if (!result) {
                res.status(404).json({ message: 'Equipment not found' });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async deleteEquipment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, id } = req.params;
            const deleted = await EquipmentModel.deleteByMountain(id, mountainId);
            if (!deleted) {
                res.status(404).json({ message: 'Equipment not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new EquipmentController();