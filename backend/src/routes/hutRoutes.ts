import { Router } from 'express';
import HutController from '../controllers/hutController';

const router = Router();

router.post('/huts', HutController.createHut);
router.get('/huts', HutController.getHuts);
router.get('/huts/:id', HutController.getHut);
router.put('/huts/:id', HutController.updateHut);
router.delete('/huts/:id', HutController.deleteHut);

export default router;