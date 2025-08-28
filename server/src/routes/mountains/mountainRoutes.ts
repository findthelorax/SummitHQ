import { Router } from 'express';
import MountainController from '../../controllers/mountains/mountainController.js';

const router = Router();

router.post('/', MountainController.createMountain);
router.get('/', MountainController.getAllMountains);
router.get('/:mountainId', MountainController.getMountain);
router.put('/:mountainId', MountainController.updateMountain);
router.delete('/:mountainId', MountainController.deleteMountain);
router.delete('/', MountainController.deleteAllMountains);

// --- Related data endpoints ---
router.get('/:mountainId/weather', MountainController.getWeather);
router.get('/:mountainId/employees', MountainController.getEmployees);
router.get('/:mountainId/locations', MountainController.getLocations);
router.get('/:mountainId/lift-checks', MountainController.getLiftChecks);
// Add similar routes for aidRoomChecks, hutChecks, trailChecks, equipmentChecks, incidents, etc.

export default router;