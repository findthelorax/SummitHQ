import { Router } from 'express';
import HutController from '../controllers/hutController';

const router = Router();

router.post('/mountains/:mountainId/huts', HutController.createHut);
router.get('/mountains/:mountainId/huts', HutController.getHuts);
router.get('/huts/:id', HutController.getHut);
router.put('/huts/:id', HutController.updateHut);
router.delete('/huts/:id', HutController.deleteHut);

export default router;