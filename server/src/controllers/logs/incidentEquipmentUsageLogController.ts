import { Request, Response } from 'express';
import IncidentEquipmentUsageLogModel from '../../models/logs/incidentEquipmentUsageLogModel.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class IncidentEquipmentUsageLogController {
    create = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, incidentId } = req.params;
        const { recordedAt, notes, equipmentId } = req.body;

        const data = {
            recordedAt,
            notes,
            mountain: { connect: { id: mountainId } },
            incident: { connect: { id: incidentId } },
            ...(equipmentId && {
                equipment: { connect: { id: equipmentId } },
            }),
        };

        const result = await IncidentEquipmentUsageLogModel.create(data);
        res.status(201).json(result);
    });

    getAll = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, incidentId } = req.params;
        const result = await IncidentEquipmentUsageLogModel.findAllByMountainAndIncident(mountainId, incidentId);
        res.status(200).json(result);
    });

    getById = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, incidentId, equipmentUsageLogId } = req.params;
        const result = await IncidentEquipmentUsageLogModel.findByIdAndMountainAndIncident(
            equipmentUsageLogId,
            mountainId,
            incidentId
        );
        if (!result) {
            res.status(404).json({ message: 'IncidentEquipmentUsageLog not found' });
            return;
        }
        res.status(200).json(result);
    });

    update = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, incidentId, equipmentUsageLogId } = req.params;
        const { equipmentId, ...otherData } = req.body;

        const updatedData = {
            ...otherData,
            ...(equipmentId && { equipmentId }),
        };

        const result = await IncidentEquipmentUsageLogModel.updateByIdAndMountainAndIncident(
            equipmentUsageLogId,
            mountainId,
            incidentId,
            updatedData
        );

        if (!result) {
            res.status(404).json({ message: 'IncidentEquipmentUsageLog not found' });
            return;
        }

        res.status(200).json(result);
    });

    delete = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, incidentId, equipmentUsageLogId } = req.params;
        const result = await IncidentEquipmentUsageLogModel.deleteByIdAndMountainAndIncident(
            equipmentUsageLogId,
            mountainId,
            incidentId
        );
        if (!result) {
            res.status(404).json({ message: 'IncidentEquipmentUsageLog not found' });
            return;
        }
        res.status(204).send();
    });
}

export default new IncidentEquipmentUsageLogController();