import { Request, Response, NextFunction } from 'express';
import IncidentModel from '../models/incidentModel';

class IncidentController {
    static async createIncident(req: Request, res: Response, next: NextFunction) {
        try {
            const { mountainId, locationId } = req.params;
            const data = req.body;
            const incident = await IncidentModel.createIncident(mountainId, locationId, data);
            res.status(201).json(incident);
        } catch (error) {
            next(error);
        }
    }

    static async assignEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            const { incidentId } = req.params;
            const { employeeId } = req.body;

            if (!employeeId) {
                const error = new Error('employeeId is required') as any;
                error.status = 400;
                throw error;
            }

            const updatedIncident = await IncidentModel.assignEmployee(incidentId, employeeId);
            res.status(200).json(updatedIncident);
        } catch (error) {
            next(error);
        }
    }

    static async findByIdAndMountain(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, mountainId } = req.params;
            const incident = await IncidentModel.findByIdAndMountain(id, mountainId);
            if (!incident) {
                const error = new Error('Incident not found') as any;
                error.status = 404;
                throw error;
            }
            res.status(200).json(incident);
        } catch (error) {
            next(error);
        }
    }

    static async findAllByMountain(req: Request, res: Response, next: NextFunction) {
        try {
            const { mountainId } = req.params;
            const incidents = await IncidentModel.findAllByMountain(mountainId);
            res.status(200).json(incidents);
        } catch (error) {
            next(error);
        }
    }

    static async updateByMountain(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, mountainId } = req.params;
            const updatedData = req.body;
            const updatedIncident = await IncidentModel.updateByMountain(id, mountainId, updatedData);
            res.status(200).json(updatedIncident);
        } catch (error) {
            next(error);
        }
    }

    static async deleteByMountain(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, mountainId } = req.params;
            await IncidentModel.deleteByMountain(id, mountainId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default IncidentController;