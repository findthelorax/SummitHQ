import { Router } from 'express';
import LocationController from '../../controllers/locationController';

const router = Router();

router.post('/:mountainID/locations', LocationController.createLocation);
router.get('/:mountainID/locations', LocationController.getLocations);
router.get('/:mountainID/locations/:locationID', LocationController.getLocation);
router.put('/:mountainID/locations/:locationID', LocationController.updateLocation);
router.delete('/:mountainID/locations/:locationID', LocationController.deleteLocation);

router.post('/:mountainID/locations/:locationID/hours', LocationController.addLocationHours);
router.get('/:mountainID/locations/:locationID/hours', LocationController.getLocationHours);
router.put('/:mountainID/locations/:locationID/hours/:hourId', LocationController.updateLocationHour);
router.delete('/:mountainID/locations/:locationID/hours/:hourId', LocationController.deleteLocationHour);

router.post('/:mountainID/locations/:locationID/incidents', LocationController.addLocationIncident);
router.get('/:mountainID/locations/:locationID/incidents', LocationController.getLocationIncidents);
router.put('/:mountainID/locations/:locationID/incidents/:incidentId', LocationController.updateLocationIncident);
router.delete('/:mountainID/locations/:locationID/incidents/:incidentId', LocationController.deleteLocationIncident);

router.get('/:mountainID/locations/:locationID/equipment', LocationController.getEquipmentByLocation);
router.patch('/:mountainID/locations/:locationID/equipment/:equipmentID', LocationController.moveEquipmentToLocation);
router.put('/:mountainID/locations/:locationID/equipment/:equipmentID', LocationController.updateEquipmentInLocation);
router.delete('/:mountainID/locations/:locationID/equipment/:equipmentID', LocationController.deleteEquipmentFromLocation);

router.post('/:mountainID/locations/:locationID/areas/:areaID', LocationController.addAreaToLocation);
router.put('/:mountainID/locations/:locationID/areas/:areaID', LocationController.updateAreaInLocation);
router.delete('/:mountainID/locations/:locationID/areas/:areaID', LocationController.removeAreaFromLocation);

export default router;