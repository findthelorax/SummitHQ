import { Router } from 'express';
import MountainController from '../controllers/mountainController';

const router = Router();

router.post('/mountains', MountainController.createMountain);
router.get('/mountains', MountainController.getAllMountains);
router.get('/mountains/:id', MountainController.getMountain);
router.put('/mountains/:id', MountainController.updateMountain);
router.delete('/mountains/:id', MountainController.deleteMountain);

export default router;