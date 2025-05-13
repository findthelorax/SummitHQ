import { Request, Response, NextFunction } from 'express';
import IncidentModel from '../../models/mountains/incidentModel';

class IncidentController {
    static async createIncident(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const { locationId, ...data } = req.body;

            const incident = await IncidentModel.createIncident(mountainId, locationId, data);

            res.status(201).json(incident);
        } catch (error) {
            next(error);
        }
    }

    static async assignEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { incidentId } = req.params;
            const { employeeId } = req.body;
    
            if (!employeeId) {
                res.status(400).json({ message: 'employeeId is required in the body.' });
                return;
            }
    
            const updatedIncident = await IncidentModel.assignEmployee(incidentId, employeeId);
    
            res.status(200).json(updatedIncident);
        } catch (error) {
            next(error);
        }
    }

    static async updateAssignedEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { incidentId } = req.params;
            const { oldEmployeeId, newEmployeeId } = req.body;
    
            if (!oldEmployeeId || !newEmployeeId) {
                res.status(400).json({ message: 'Both oldEmployeeId and newEmployeeId are required in the body.' });
                return;
            }
    
            const updatedIncident = await IncidentModel.updateAssignedEmployee(incidentId, oldEmployeeId, newEmployeeId);
    
            res.status(200).json(updatedIncident);
        } catch (error) {
            next(error);
        }
    }

    static async removeEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { incidentId } = req.params;
            const { employeeId } = req.body;
    
            if (!employeeId) {
                res.status(400).json({ message: 'employeeId is required in the body.' });
                return;
            }
    
            const updatedIncident = await IncidentModel.removeEmployee(incidentId, employeeId);
    
            res.status(200).json(updatedIncident);
        } catch (error) {
            next(error);
        }
    }
    
    static async findByIdAndMountain(req: Request, res: Response, next: NextFunction) {
        try {
            const { incidentId, mountainId } = req.params;
            const incident = await IncidentModel.findByIdAndMountain(incidentId, mountainId);
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
            const { incidentId, mountainId } = req.params;
            const updatedData = req.body;
            const updatedIncident = await IncidentModel.updateByMountain(incidentId, mountainId, updatedData);
            res.status(200).json(updatedIncident);
        } catch (error) {
            next(error);
        }
    }

    static async deleteByMountain(req: Request, res: Response, next: NextFunction) {
        try {
            const { incidentId, mountainId } = req.params;
            await IncidentModel.deleteByMountain(incidentId, mountainId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default IncidentController;