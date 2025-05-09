import { Router } from 'express';
import HutController from '../../controllers/hutController';

const router = Router();

router.post('/:mountainID/huts', HutController.createHut);
router.get('/:mountainID/huts', HutController.getHuts);
router.get('/:mountainID/huts/:hutID', HutController.getHut);
router.put('/:mountainID/huts/:hutID', HutController.updateHut);
router.delete('/:mountainID/huts/:hutID', HutController.deleteHut);

export default router;