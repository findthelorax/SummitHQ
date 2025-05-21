import { Router } from 'express';
import HutController from '../../controllers/mountains/hutController.js';
import HutCheckController from '../../controllers/logs/hutCheckController.js';

const router = Router();

router.post('/:mountainId/huts', HutController.createHut);
router.get('/:mountainId/huts', HutController.getHuts);
router.get('/:mountainId/huts/:hutId', HutController.getHut);
router.put('/:mountainId/huts/:hutId', HutController.updateHut);
router.delete('/:mountainId/huts/:hutId', HutController.deleteHut);

router.post('/:mountainId/huts/:hutId/hutChecks', HutCheckController.create);
router.get('/:mountainId/huts/:hutId/hutChecks', HutCheckController.getAll);
router.get('/:mountainId/huts/:hutId/hutChecks/:hutCheckId', HutCheckController.getById);
router.put('/:mountainId/huts/:hutId/hutChecks/:hutCheckId', HutCheckController.update);
router.delete('/:mountainId/huts/:hutId/hutChecks/:hutCheckId', HutCheckController.delete);

export default router;