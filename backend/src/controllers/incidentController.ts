import { Request, Response, NextFunction } from 'express';
import IncidentModel from '../models/incidentModel';

class IncidentController {
    async createIncident(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const data = req.body;

            // Validate locationType
            const validLocationTypes = ["AID_ROOM", "HUT", "LODGE", "TRAIL", "LIFT", "OTHER"];
            if (data.locationType && !validLocationTypes.includes(data.locationType.toUpperCase())) {
                res.status(400).json({ message: `Invalid locationType: ${data.locationType}` });
                return;
            }

            // Validate required location IDs based on locationType
            switch (data.locationType?.toUpperCase()) {
                case "LIFT":
                    if (!data.liftId) {
                        res.status(400).json({ message: "liftId is required for locationType 'LIFT'" });
                        return;
                    }
                    break;
                case "TRAIL":
                    if (!data.trailId) {
                        res.status(400).json({ message: "trailId is required for locationType 'TRAIL'" });
                        return;
                    }
                    break;
                case "LODGE":
                    if (!data.lodgeId) {
                        res.status(400).json({ message: "lodgeId is required for locationType 'LODGE'" });
                        return;
                    }
                    break;
                case "HUT":
                    if (!data.hutId) {
                        res.status(400).json({ message: "hutId is required for locationType 'HUT'" });
                        return;
                    }
                    break;
                case "AID_ROOM":
                    if (!data.aidRoomId) {
                        res.status(400).json({ message: "aidRoomId is required for locationType 'AID_ROOM'" });
                        return;
                    }
                    break;
                case "OTHER":
                    // No specific location connection required for "OTHER"
                    break;
                default:
                    res.status(400).json({ message: `Invalid or missing locationType: ${data.locationType}` });
                    return;
            }

            const result = await IncidentModel.create(mountainId, data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async assignEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { employeeId } = req.body;

            if (!employeeId) {
                res.status(400).json({ message: 'employeeId is required' });
                return;
            }

            const result = await IncidentModel.assignEmployee(id, employeeId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getIncident(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, id } = req.params;
            const result = await IncidentModel.findByIdAndMountain(id, mountainId);
            if (!result) {
                res.status(404).json({ message: 'Incident not found' });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getIncidents(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const incidents = await IncidentModel.findAllByMountain(mountainId);
            res.status(200).json(incidents);
        } catch (error) {
            next(error);
        }
    }

    async updateIncident(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id, mountainId } = req.params;
            const updatedData = req.body;

            // Validate locationType
            const validLocationTypes = ["AID_ROOM", "HUT", "LODGE", "TRAIL", "LIFT", "OTHER"];
            if (updatedData.locationType && !validLocationTypes.includes(updatedData.locationType.toUpperCase())) {
                res.status(400).json({ message: `Invalid locationType: ${updatedData.locationType}` });
                return;
            }

            const result = await IncidentModel.updateByMountain(id, mountainId, updatedData);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async deleteIncident(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, id } = req.params;
            const deleted = await IncidentModel.deleteByMountain(id, mountainId);
            if (!deleted) {
                res.status(404).json({ message: 'Incident not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new IncidentController();