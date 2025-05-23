import { Request, Response } from 'express';
import LocationModel from '../../models/mountains/locationModel.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class LocationController {
    createLocation = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId } = req.params;
        const data = req.body;
        const location = await LocationModel.create(mountainId, data);
        res.status(201).json(location);
    });

    getLocation = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, locationId } = req.params;
        const location = await LocationModel.findByIdAndMountain(locationId, mountainId);
        if (!location) {
            res.status(404).json({ message: 'Location not found' });
            return;
        }
        res.status(200).json(location);
    });

    getLocations = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId } = req.params;
        const locations = await LocationModel.findAllByMountain(mountainId);
        res.status(200).json(locations);
    });

    updateLocation = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, locationId } = req.params;
        const data = req.body;
        const updatedLocation = await LocationModel.updateByMountain(locationId, mountainId, data);
        if (!updatedLocation) {
            res.status(404).json({ message: 'Location not found' });
            return;
        }
        res.status(200).json(updatedLocation);
    });

    deleteLocation = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, locationId } = req.params;
        const deletedLocation = await LocationModel.deleteByMountain(locationId, mountainId);
        if (!deletedLocation) {
            res.status(404).json({ message: 'Location not found' });
            return;
        }
        res.status(204).send();
    });

    getLocationHours = asyncWrapper(async (req: Request, res: Response) => {
        const { locationId } = req.params;
        const hours = await LocationModel.getHours(locationId);
        res.status(200).json(hours);
    });

    addLocationHours = asyncWrapper(async (req: Request, res: Response) => {
        const { locationId } = req.params;
        const hoursData = req.body;

        if (!locationId) {
            res.status(400).json({ message: 'Location ID is required in the route.' });
            return;
        }

        const createdHours = await LocationModel.addHours(locationId, hoursData);
        res.status(201).json(createdHours);
    });

    updateLocationHour = asyncWrapper(async (req: Request, res: Response) => {
        const { locationId, hourId } = req.params;
        const hourData = req.body;

        if (!locationId || !hourId) {
            res.status(400).json({ message: 'Location ID and Hour ID are required in the route.' });
            return;
        }

        const updatedHour = await LocationModel.updateHour(locationId, hourId, hourData);

        res.status(200).json(updatedHour);
    });

    deleteLocationHour = asyncWrapper(async (req: Request, res: Response) => {
        const { locationId, hourId } = req.params;
        const deletedHour = await LocationModel.deleteHour(locationId, hourId);
        if (!deletedHour) {
            res.status(404).json({ message: 'Hour not found for this location' });
            return;
        }
        res.status(204).send();
    });

    getLocationIncidents = asyncWrapper(async (req: Request, res: Response) => {
        const { locationId } = req.params;
        const incidents = await LocationModel.getIncidents(locationId);
        res.status(200).json(incidents);
    });

    addIncidentToLocation = asyncWrapper(async (req: Request, res: Response) => {
        const { locationId } = req.params;
        const incidentData = req.body;
        const incident = await LocationModel.addIncidentToLocation(locationId, incidentData);
        res.status(201).json(incident);
    });

    updateLocationIncident = asyncWrapper(async (req: Request, res: Response) => {
        const { locationId, incidentId } = req.params;
        const incidentData = req.body;
        const updatedIncident = await LocationModel.updateIncident(locationId, incidentId, incidentData);
        if (!updatedIncident) {
            res.status(404).json({ message: 'Incident not found for this location' });
            return;
        }
        res.status(200).json(updatedIncident);
    });

    deleteIncidentFromLocation = asyncWrapper(async (req: Request, res: Response) => {
        const { locationId, incidentId } = req.params;
        const deletedIncident = await LocationModel.deleteIncidentFromLocation(locationId, incidentId);
        if (!deletedIncident) {
            res.status(404).json({ message: 'Incident not found for this location' });
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

        const equipment = await LocationModel.findEquipmentByLocation(mountainId, locationId);

        res.status(200).json(equipment);
    });

    // addEquipmentToLocation = asyncWrapper(async (req: Request, res: Response) => {
    //     const { mountainId, locationId, equipmentId } = req.params;

    //     if (!mountainId || !locationId || !equipmentId) {
    //         res.status(400).json({ message: 'Mountain ID, Location ID, and Equipment ID are required.' });
    //         return;
    //     }

    //     const updatedEquipment = await LocationModel.addEquipmentToLocation(mountainId, locationId, equipmentId);

    //     if (!updatedEquipment) {
    //         res.status(404).json({ message: 'Equipment, Location, or Mountain not found.' });
    //         return;
    //     }

    //     res.status(200).json(updatedEquipment);
    // });

    // moveEquipmentToLocation = asyncWrapper(async (req: Request, res: Response) => {
    //     const { mountainId, locationId: currentLocationId, equipmentId } = req.params;
    //     const { newLocationId } = req.body;

    //     if (!newLocationId) {
    //         res.status(400).json({ message: 'New Location ID is required in the body.' });
    //         return;
    //     }

    //     const updatedEquipment = await LocationModel.moveEquipmentToLocation(
    //         mountainId,
    //         currentLocationId,
    //         newLocationId,
    //         equipmentId
    //     );

    //     res.status(200).json(updatedEquipment);
    // });

    // updateEquipmentInLocation = asyncWrapper(async (req: Request, res: Response) => {
    //     const { mountainId, locationId, equipmentId } = req.params;
    //     const updatedData = req.body;

    //     const updatedEquipment = await LocationModel.updateEquipmentInLocation(
    //         mountainId,
    //         locationId,
    //         equipmentId,
    //         updatedData
    //     );

    //     if (!updatedEquipment) {
    //         res.status(404).json({ message: 'Equipment not found in this location' });
    //         return;
    //     }

    //     res.status(200).json(updatedEquipment);
    // });

    // deleteEquipmentFromLocation = asyncWrapper(async (req: Request, res: Response) => {
    //     const { mountainId, locationId, equipmentId } = req.params;

    //     const deleted = await LocationModel.deleteEquipmentFromLocation(
    //         mountainId,
    //         locationId,
    //         equipmentId
    //     );

    //     if (!deleted) {
    //         res.status(404).json({ message: 'Equipment not found in this location' });
    //         return;
    //     }

    //     res.status(204).send();
    // });

    addAreaToLocation = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, locationId, areaId } = req.params;

        const updatedLocation = await LocationModel.addAreaToLocation(mountainId, locationId, areaId);

        res.status(200).json(updatedLocation);
    });

    updateAreaInLocation = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, locationId, areaId } = req.params;
        const updatedData = req.body;

        const result = await LocationModel.updateAreaInLocation(mountainId, locationId, areaId, updatedData);

        if (!result) {
            res.status(404).json({ message: 'Area or Location not found' });
            return;
        }

        res.status(200).json(result);
    });

    removeAreaFromLocation = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, locationId, areaId } = req.params;

        const result = await LocationModel.removeAreaFromLocation(mountainId, locationId, areaId);

        if (!result) {
            res.status(404).json({ message: 'Area or Location not found' });
            return;
        }

        const updatedLocation = await LocationModel.findByIdAndMountain(locationId, mountainId);

        if (!updatedLocation) {
            res.status(404).json({ message: 'Updated location not found' });
            return;
        }

        res.status(200).json(updatedLocation);
    });
}

export default new LocationController();