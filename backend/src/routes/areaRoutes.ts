import { Router } from 'express';
import AreaController from '../controllers/areaController';

const router = Router();

router.post('/:mountainId/areas', AreaController.createArea);
router.get('/:mountainId/areas', AreaController.getAreas);
router.get('/:mountainId/areas/:id', AreaController.getArea);
router.put('/:mountainId/areas/:id', AreaController.updateArea);
router.delete('/:mountainId/areas/:id', AreaController.deleteArea);

export default router;