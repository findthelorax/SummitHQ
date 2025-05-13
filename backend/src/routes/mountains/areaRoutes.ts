import { Router } from 'express';
import AreaController from '../../controllers/mountains/areaController';

const router = Router();

router.post('/:mountainId/areas', AreaController.createArea);
router.get('/:mountainId/areas', AreaController.getAreas);
router.get('/:mountainId/areas/:areaId', AreaController.getArea);
router.put('/:mountainId/areas/:areaId', AreaController.updateArea);
router.delete('/:mountainId/areas/:areaId', AreaController.deleteArea);

export default router;