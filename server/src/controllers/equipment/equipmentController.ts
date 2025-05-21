import { Request, Response } from 'express';
import EquipmentModel from '../../models/equipment/equipmentModel.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class EquipmentController {
    createEquipment = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId } = req.params;
        const data = req.body;

        const result = await EquipmentModel.create(data, mountainId);
        res.status(201).json(result);
    });

    getEquipments = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId } = req.params;
        const equipment = await EquipmentModel.findAllByMountain(mountainId);
        res.status(200).json(equipment);
    });

    getEquipment = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, equipmentId } = req.params;
        const result = await EquipmentModel.findByIdAndMountain(equipmentId, mountainId);
        if (!result) {
            res.status(404).json({ message: 'Equipment not found' });
            return;
        }
        res.status(200).json(result);
    });

    updateEquipment = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, equipmentId } = req.params;
        const updatedData = req.body;

        const result = await EquipmentModel.updateByMountain(equipmentId, mountainId, updatedData);
        if (!result) {
            res.status(404).json({ message: 'Equipment not found' });
            return;
        }

        res.status(200).json(result);
    });

    deleteEquipment = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, equipmentId } = req.params;

        const deleted = await EquipmentModel.deleteByMountain(equipmentId, mountainId);
        if (!deleted) {
            res.status(404).json({ message: 'Equipment not found' });
            return;
        }

        res.status(204).send();
    });

    getEquipmentByLocation = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, locationId } = req.params;

        if (!locationId) {
            res.status(400).json({ message: 'Location ID is required' });
            return;
        }

        const equipment = await EquipmentModel.findAllByLocation(mountainId, locationId);

        res.status(200).json(equipment);
    });

    moveEquipmentToLocation = asyncWrapper(async (req: Request, res: Response) => {
        const { equipmentId } = req.params;
        const { newLocationId } = req.body;

        const updatedEquipment = await EquipmentModel.moveToLocation(equipmentId, newLocationId);

        if (!updatedEquipment) {
            res.status(404).json({ message: 'Equipment or location not found' });
            return;
        }

        res.status(200).json(updatedEquipment);
    });

    updateEquipmentInLocation = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, equipmentId } = req.params;
        const updatedData = req.body;

        const result = await EquipmentModel.updateByMountain(equipmentId, mountainId, updatedData);
        if (!result) {
            res.status(404).json({ message: 'Equipment not found' });
            return;
        }

        res.status(200).json(result);
    });

    deleteEquipmentFromLocation = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, equipmentId } = req.params;

        const deleted = await EquipmentModel.deleteByMountain(equipmentId, mountainId);
        if (!deleted) {
            res.status(404).json({ message: 'Equipment not found' });
            return;
        }

        res.status(204).send();
    });
}

export default new EquipmentController();