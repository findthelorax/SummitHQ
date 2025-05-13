import { Request, Response, NextFunction } from 'express';
import IncidentEquipmentUsageLogModel from '../../models/logs/incidentEquipmentUsageLogModel';

class IncidentEquipmentUsageLogController {
	async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
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
		} catch (error) {
			next(error);
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { mountainId, incidentId } = req.params;
			const result = await IncidentEquipmentUsageLogModel.findAllByMountainAndIncident(mountainId, incidentId);
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

	async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
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
		} catch (error) {
			next(error);
		}
	}

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, incidentId, equipmentUsageLogId } = req.params;
            const { equipmentId, ...otherData } = req.body;
    
            const updatedData = {
                ...otherData,
                ...(equipmentId && { equipmentId }), // Include equipmentId if provided
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
        } catch (error) {
            next(error);
        }
    }

	async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
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
		} catch (error) {
			next(error);
		}
	}
}

export default new IncidentEquipmentUsageLogController();
