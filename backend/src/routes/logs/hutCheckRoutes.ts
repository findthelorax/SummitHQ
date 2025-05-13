import { Router } from 'express';
import HutCheckController from '../../controllers/logs/hutCheckController';

const router = Router();

router.post('/:mountainId/huts/:hutId/hutChecks', HutCheckController.create);
router.get('/:mountainId/huts/:hutId/hutChecks', HutCheckController.getAll);
router.get('/:mountainId/huts/:hutId/hutChecks/:hutCheckId', HutCheckController.getById);
router.put('/:mountainId/huts/:hutId/hutChecks/:hutCheckId', HutCheckController.update);
router.delete('/:mountainId/huts/:hutId/hutChecks/:hutCheckId', HutCheckController.delete);

export default router;