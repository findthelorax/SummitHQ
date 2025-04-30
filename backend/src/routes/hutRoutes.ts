import { Router } from 'express';
import HutController from '../controllers/hutController';

const router = Router();

router.post('/:mountainId/huts', HutController.createHut);
router.get('/:mountainId/huts', HutController.getHuts);
router.get('/:mountainId/huts/:id', HutController.getHut);
router.put('/:mountainId/huts/:id', HutController.updateHut);
router.delete('/:mountainId/huts/:id', HutController.deleteHut);

export default router;