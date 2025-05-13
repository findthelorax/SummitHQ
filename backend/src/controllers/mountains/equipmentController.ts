import { Request, Response, NextFunction } from 'express';
import EquipmentModel from '../../models/mountains/equipmentModel';

class EquipmentController {
    async createEquipment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const data = req.body;

            const result = await EquipmentModel.create(data, mountainId);

            res.status(201).json(result);
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

    async getEquipment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, equipmentId } = req.params;
            const result = await EquipmentModel.findByIdAndMountain(equipmentId, mountainId);
            if (!result) {
                res.status(404).json({ message: 'Equipment not found' });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateEquipment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, equipmentId } = req.params;
            const updatedData = req.body;

            const result = await EquipmentModel.updateByMountain(equipmentId, mountainId, updatedData);
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
            const { mountainId, equipmentId } = req.params;

            const deleted = await EquipmentModel.deleteByMountain(equipmentId, mountainId);
            if (!deleted) {
                res.status(404).json({ message: 'Equipment not found' });
                return;
            }

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async getEquipmentByLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, locationId } = req.params;
    
            if (!locationId) {
                res.status(400).json({ message: 'Location ID is required' });
                return;
            }
    
            const equipment = await EquipmentModel.findAllByLocation(mountainId, locationId);
    
            res.status(200).json(equipment);
        } catch (error) {
            next(error);
        }
    }

    async moveEquipmentToLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { equipmentId } = req.params;
            const { newLocationId } = req.body;

            const updatedEquipment = await EquipmentModel.moveToLocation(equipmentId, newLocationId);

            if (!updatedEquipment) {
                res.status(404).json({ message: 'Equipment or location not found' });
                return;
            }

            res.status(200).json(updatedEquipment);
        } catch (error) {
            next(error);
        }
    }

    async updateEquipmentInLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, equipmentId } = req.params;
            const updatedData = req.body;

            const result = await EquipmentModel.updateByMountain(equipmentId, mountainId, updatedData);
            if (!result) {
                res.status(404).json({ message: 'Equipment not found' });
                return;
            }

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async deleteEquipmentFromLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, equipmentId } = req.params;

            const deleted = await EquipmentModel.deleteByMountain(equipmentId, mountainId);
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