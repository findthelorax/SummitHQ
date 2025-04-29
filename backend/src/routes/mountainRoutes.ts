import { Router } from 'express';
import MountainController from '../controllers/mountainController';

const router = Router();

router.post('/', MountainController.createMountain);
router.get('/', MountainController.getAllMountains);
router.get('/:id', MountainController.getMountain);
router.put('/:id', MountainController.updateMountain);
router.delete('/:id', MountainController.deleteMountain);
router.delete('/', MountainController.deleteAllMountains);

export default router;