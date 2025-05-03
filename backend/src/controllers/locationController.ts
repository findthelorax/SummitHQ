import { Request, Response, NextFunction } from 'express';
import LocationModel from '../models/locationModel';

class LocationController {
    async createLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const data = req.body;
            const location = await LocationModel.create(mountainId, data);
            res.status(201).json(location);
        } catch (error) {
            next(error);
        }
    }

    async getLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, id } = req.params;
            const location = await LocationModel.findByIdAndMountain(id, mountainId);
            if (!location) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            res.status(200).json(location);
        } catch (error) {
            next(error);
        }
    }

    async getLocations(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId } = req.params;
            const locations = await LocationModel.findAllByMountain(mountainId);
            res.status(200).json(locations);
        } catch (error) {
            next(error);
        }
    }

    async updateLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, id } = req.params;
            const data = req.body;
            const updatedLocation = await LocationModel.updateByMountain(id, mountainId, data);
            if (!updatedLocation) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            res.status(200).json(updatedLocation);
        } catch (error) {
            next(error);
        }
    }

    async deleteLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, id } = req.params;
            const deletedLocation = await LocationModel.deleteByMountain(id, mountainId);
            if (!deletedLocation) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async getLocationHours(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const hours = await LocationModel.getHours(id);
            res.status(200).json(hours);
        } catch (error) {
            next(error);
        }
    }

    async addLocationHours(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { locationId } = req.params;
            const hoursData = req.body;
    
            if (!locationId) {
                res.status(400).json({ message: 'Location ID is required in the route.' });
                return;
            }
    
            const createdHours = await LocationModel.addHours(locationId, hoursData);
            res.status(201).json(createdHours);
        } catch (error) {
            next(error);
        }
    }

    async updateLocationHour(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { locationId, hourId } = req.params;
            const hourData = req.body;
    
            if (!locationId || !hourId) {
                res.status(400).json({ message: 'Location ID and Hour ID are required in the route.' });
                return;
            }
    
            const updatedHour = await LocationModel.updateHour(locationId, hourId, hourData);
    
            res.status(200).json(updatedHour);
        } catch (error) {
            next(error);
        }
    }

    async deleteLocationHour(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id, hourId } = req.params;
            const deletedHour = await LocationModel.deleteHour(id, hourId);
            if (!deletedHour) {
                res.status(404).json({ message: 'Hour not found for this location' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async getLocationIncidents(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const incidents = await LocationModel.getIncidents(id);
            res.status(200).json(incidents);
        } catch (error) {
            next(error);
        }
    }

    async addLocationIncident(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const incidentData = req.body;
            const incident = await LocationModel.addIncident(id, incidentData);
            res.status(201).json(incident);
        } catch (error) {
            next(error);
        }
    }

    async updateLocationIncident(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id, incidentId } = req.params;
            const incidentData = req.body;
            const updatedIncident = await LocationModel.updateIncident(id, incidentId, incidentData);
            if (!updatedIncident) {
                res.status(404).json({ message: 'Incident not found for this location' });
                return;
            }
            res.status(200).json(updatedIncident);
        } catch (error) {
            next(error);
        }
    }

    async deleteLocationIncident(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id, incidentId } = req.params;
            const deletedIncident = await LocationModel.deleteIncident(id, incidentId);
            if (!deletedIncident) {
                res.status(404).json({ message: 'Incident not found for this location' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async getEquipmentByLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, locationId } = req.params;

            if (!locationId) {
                res.status(400).json({ message: 'Location ID is required' });
                return;
            }

            const equipment = await LocationModel.findEquipmentByLocation(mountainId, locationId);

            res.status(200).json(equipment);
        } catch (error) {
            next(error);
        }
    }

    async moveEquipmentToLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { equipmentId } = req.params;
            const { newLocationId } = req.body;

            if (!newLocationId) {
                res.status(400).json({ message: 'New Location ID is required' });
                return;
            }

            const updatedEquipment = await LocationModel.moveEquipment(equipmentId, newLocationId);

            if (!updatedEquipment) {
                res.status(404).json({ message: 'Equipment or location not found' });
                return;
            }

            res.status(200).json(updatedEquipment);
        } catch (error) {
            next(error);
        }
    }

    async updateEquipmentInLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, locationId, equipmentId } = req.params;
            const updatedData = req.body;

            const updatedEquipment = await LocationModel.updateEquipmentInLocation(
                mountainId,
                locationId,
                equipmentId,
                updatedData
            );

            if (!updatedEquipment) {
                res.status(404).json({ message: 'Equipment not found in this location' });
                return;
            }

            res.status(200).json(updatedEquipment);
        } catch (error) {
            next(error);
        }
    }

    async deleteEquipmentFromLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, locationId, equipmentId } = req.params;

            const deleted = await LocationModel.deleteEquipmentFromLocation(
                mountainId,
                locationId,
                equipmentId
            );

            if (!deleted) {
                res.status(404).json({ message: 'Equipment not found in this location' });
                return;
            }

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

        async addAreaToLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, locationId, areaId } = req.params;
    
            const result = await LocationModel.addAreaToLocation(mountainId, locationId, areaId);
    
            if (!result) {
                res.status(404).json({ message: 'Area or Location not found' });
                return;
            }
    
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
    
    async updateAreaInLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { mountainId, locationId, areaId } = req.params;
            const updatedData = req.body;
    
            const result = await LocationModel.updateAreaInLocation(mountainId, locationId, areaId, updatedData);
    
            if (!result) {
                res.status(404).json({ message: 'Area or Location not found' });
                return;
            }
    
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    
    async removeAreaFromLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
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
        } catch (error) {
            next(error);
        }
    }
}

export default new LocationController();