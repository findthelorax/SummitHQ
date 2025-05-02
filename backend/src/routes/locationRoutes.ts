import { Router } from 'express';
import LocationController from '../controllers/locationController';

const router = Router();

router.post('/:mountainId/locations', LocationController.createLocation);
router.get('/:mountainId/locations', LocationController.getLocations);
router.get('/:mountainId/locations/:locationId', LocationController.getLocation);
router.put('/:mountainId/locations/:locationId', LocationController.updateLocation);
router.delete('/:mountainId/locations/:locationId', LocationController.deleteLocation);

router.post('/:mountainId/locations/:locationId/hours', LocationController.addLocationHours);
router.get('/:mountainId/locations/:locationId/hours', LocationController.getLocationHours);
router.put('/:mountainId/locations/:locationId/hours/:hourId', LocationController.updateLocationHour);
router.delete('/:mountainId/locations/:locationId/hours/:hourId', LocationController.deleteLocationHour);

router.post('/:mountainId/locations/:locationId/incidents', LocationController.addLocationIncident);
router.get('/:mountainId/locations/:locationId/incidents', LocationController.getLocationIncidents);
router.put('/:mountainId/locations/:locationId/incidents/:incidentId', LocationController.updateLocationIncident);
router.delete('/:mountainId/locations/:locationId/incidents/:incidentId', LocationController.deleteLocationIncident);

router.post('/:mountainId/locations/:locationId/equipment', LocationController.addLocationEquipment);
router.get('/:mountainId/locations/:locationId/equipment', LocationController.getLocationEquipment);
router.put('/:mountainId/locations/:locationId/equipment/:equipmentId', LocationController.updateLocationEquipment);
router.delete('/:mountainId/locations/:locationId/equipment/:equipmentId', LocationController.deleteLocationEquipment);

export default router;