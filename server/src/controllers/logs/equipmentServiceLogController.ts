import { Request, Response } from 'express';
import EquipmentServiceLogModel from '../../models/logs/equipmentServiceLogModel.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class EquipmentServiceLogController {
    create = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, equipmentId } = req.params;
        const data = { ...req.body, mountainId, equipmentId };
        const result = await EquipmentServiceLogModel.create(data);
        res.status(201).json(result);
    });

    getAll = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, equipmentId } = req.params;
        const result = await EquipmentServiceLogModel.findAllByMountainAndEquipment(mountainId, equipmentId);
        res.status(200).json(result);
    });

    getById = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, equipmentId, serviceLogId } = req.params;
        const result = await EquipmentServiceLogModel.findByIdAndMountainAndEquipment(serviceLogId, mountainId, equipmentId);
        if (!result) {
            res.status(404).json({ message: 'EquipmentServiceLog not found' });
            return;
        }
        res.status(200).json(result);
    });

    update = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, equipmentId, serviceLogId } = req.params;
        const updatedData = req.body;
        const result = await EquipmentServiceLogModel.updateByIdAndMountainAndEquipment(serviceLogId, mountainId, equipmentId, updatedData);
        if (!result) {
            res.status(404).json({ message: 'EquipmentServiceLog not found' });
            return;
        }
        res.status(200).json(result);
    });

    delete = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, equipmentId, serviceLogId } = req.params;
        const result = await EquipmentServiceLogModel.deleteByIdAndMountainAndEquipment(serviceLogId, mountainId, equipmentId);
        if (!result) {
            res.status(404).json({ message: 'EquipmentServiceLog not found' });
            return;
        }
        res.status(204).send();
    });
}

export default new EquipmentServiceLogController();