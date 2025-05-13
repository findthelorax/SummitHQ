import { Router } from 'express';
import MountainController from '../../controllers/mountains/mountainController';

const router = Router();

router.post('/', MountainController.createMountain);
router.get('/', MountainController.getAllMountains);
router.get('/:mountainId', MountainController.getMountain);
router.put('/:mountainId', MountainController.updateMountain);
router.delete('/:mountainId', MountainController.deleteMountain);
router.delete('/', MountainController.deleteAllMountains);

export default router;