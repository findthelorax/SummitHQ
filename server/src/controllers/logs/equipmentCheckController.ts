import { Request, Response } from 'express';
import EquipmentCheckModel from '../../models/logs/equipmentCheckModel.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class EquipmentCheckController {
    create = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, equipmentId } = req.params;
        const data = { ...req.body, mountainId, equipmentId };
        const result = await EquipmentCheckModel.create(data);
        res.status(201).json(result);
    });

    getAll = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, equipmentId } = req.params;
        const result = await EquipmentCheckModel.findAllByMountainAndEquipment(mountainId, equipmentId);
        res.status(200).json(result);
    });

    getById = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, equipmentId, equipmentCheckId } = req.params;
        const result = await EquipmentCheckModel.findByIdAndMountainAndEquipment(equipmentCheckId, mountainId, equipmentId);
        if (!result) {
            res.status(404).json({ message: 'EquipmentCheck not found' });
            return;
        }
        res.status(200).json(result);
    });

    update = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, equipmentId, equipmentCheckId } = req.params;
        const updatedData = req.body;
        const result = await EquipmentCheckModel.updateByIdAndMountainAndEquipment(equipmentCheckId, mountainId, equipmentId, updatedData);
        if (!result) {
            res.status(404).json({ message: 'EquipmentCheck not found' });
            return;
        }
        res.status(200).json(result);
    });

    delete = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, equipmentId, equipmentCheckId } = req.params;
        const result = await EquipmentCheckModel.deleteByIdAndMountainAndEquipment(equipmentCheckId, mountainId, equipmentId);
        if (!result) {
            res.status(404).json({ message: 'EquipmentCheck not found' });
            return;
        }
        res.status(204).send();
    });
}

export default new EquipmentCheckController();