import { Router } from 'express';
import AreaController from '../../controllers/areaController';

const router = Router();

router.post('/:mountainID/areas', AreaController.createArea);
router.get('/:mountainID/areas', AreaController.getAreas);
router.get('/:mountainID/areas/:areaID', AreaController.getArea);
router.put('/:mountainID/areas/:areaID', AreaController.updateArea);
router.delete('/:mountainID/areas/:areaID', AreaController.deleteArea);

export default router;