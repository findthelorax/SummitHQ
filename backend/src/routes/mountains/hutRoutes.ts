import { Router } from 'express';
import HutController from '../../controllers/mountains/hutController';

const router = Router();

router.post('/:mountainId/huts', HutController.createHut);
router.get('/:mountainId/huts', HutController.getHuts);
router.get('/:mountainId/huts/:hutId', HutController.getHut);
router.put('/:mountainId/huts/:hutId', HutController.updateHut);
router.delete('/:mountainId/huts/:hutId', HutController.deleteHut);

export default router;