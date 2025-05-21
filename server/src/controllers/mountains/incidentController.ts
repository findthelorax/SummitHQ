import { Request, Response } from 'express';
import IncidentModel from '../../models/mountains/incidentModel.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class IncidentController {
    createIncident = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId } = req.params;
        const { locationId, ...data } = req.body;

        const incident = await IncidentModel.createIncident(mountainId, locationId, data);

        res.status(201).json(incident);
    });

    assignEmployee = asyncWrapper(async (req: Request, res: Response) => {
        const { incidentId } = req.params;
        const { employeeId } = req.body;

        if (!employeeId) {
            res.status(400).json({ message: 'employeeId is required in the body.' });
            return;
        }

        const updatedIncident = await IncidentModel.assignEmployee(incidentId, employeeId);

        res.status(200).json(updatedIncident);
    });

    updateAssignedEmployee = asyncWrapper(async (req: Request, res: Response) => {
        const { incidentId } = req.params;
        const { oldEmployeeId, newEmployeeId } = req.body;

        if (!oldEmployeeId || !newEmployeeId) {
            res.status(400).json({ message: 'Both oldEmployeeId and newEmployeeId are required in the body.' });
            return;
        }

        const updatedIncident = await IncidentModel.updateAssignedEmployee(incidentId, oldEmployeeId, newEmployeeId);

        res.status(200).json(updatedIncident);
    });

    removeEmployee = asyncWrapper(async (req: Request, res: Response) => {
        const { incidentId } = req.params;
        const { employeeId } = req.body;

        if (!employeeId) {
            res.status(400).json({ message: 'employeeId is required in the body.' });
            return;
        }

        const updatedIncident = await IncidentModel.removeEmployee(incidentId, employeeId);

        res.status(200).json(updatedIncident);
    });

    findByIdAndMountain = asyncWrapper(async (req: Request, res: Response) => {
        const { incidentId, mountainId } = req.params;
        const incident = await IncidentModel.findByIdAndMountain(incidentId, mountainId);
        if (!incident) {
            res.status(404).json({ message: 'Incident not found' });
            return;
        }
        res.status(200).json(incident);
    });

    findAllByMountain = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId } = req.params;
        const incidents = await IncidentModel.findAllByMountain(mountainId);
        res.status(200).json(incidents);
    });

    updateByMountain = asyncWrapper(async (req: Request, res: Response) => {
        const { incidentId, mountainId } = req.params;
        const updatedData = req.body;
        const updatedIncident = await IncidentModel.updateByMountain(incidentId, mountainId, updatedData);
        res.status(200).json(updatedIncident);
    });

    deleteByMountain = asyncWrapper(async (req: Request, res: Response) => {
        const { incidentId, mountainId } = req.params;
        await IncidentModel.deleteByMountain(incidentId, mountainId);
        res.status(204).send();
    });
}

export default new IncidentController();