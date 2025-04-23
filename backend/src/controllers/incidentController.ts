import { Request, Response, NextFunction } from 'express';
import IncidentModel from '../models/incidentModel';

class IncidentController {
    async createIncident(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const data = req.body;
            const result = await IncidentModel.create(mountainId, data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getIncident(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const result = await IncidentModel.findById(id);
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
            const { id } = req.params;
            const updatedData = req.body;
            const result = await IncidentModel.update(id, updatedData);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async deleteIncident(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            await IncidentModel.delete(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new IncidentController();