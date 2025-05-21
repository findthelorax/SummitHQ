import { Router } from 'express';
import LocationController from '../../controllers/mountains/locationController.js';

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

router.post('/:mountainId/locations/:locationId/incidents', LocationController.addIncidentToLocation);
router.get('/:mountainId/locations/:locationId/incidents', LocationController.getLocationIncidents);
router.put('/:mountainId/locations/:locationId/incidents/:incidentId', LocationController.updateLocationIncident);
router.delete('/:mountainId/locations/:locationId/incidents/:incidentId', LocationController.deleteIncidentFromLocation);

router.get('/:mountainId/locations/:locationId/equipment', LocationController.getEquipmentByLocation);
router.post('/:mountainId/locations/:locationId/equipment/:equipmentId', LocationController.addEquipmentToLocation);
router.patch('/:mountainId/locations/:locationId/equipment/:equipmentId', LocationController.moveEquipmentToLocation);
router.put('/:mountainId/locations/:locationId/equipment/:equipmentId', LocationController.updateEquipmentInLocation);
router.delete('/:mountainId/locations/:locationId/equipment/:equipmentId', LocationController.deleteEquipmentFromLocation);

router.post('/:mountainId/locations/:locationId/areas/:areaId', LocationController.addAreaToLocation);
router.put('/:mountainId/locations/:locationId/areas/:areaId', LocationController.updateAreaInLocation);
router.delete('/:mountainId/locations/:locationId/areas/:areaId', LocationController.removeAreaFromLocation);

export default router;