import { Router } from 'express';
import HoursController from '../controllers/hoursController';

const router = Router();

router.post('/:mountainId/hours', HoursController.createHours);
router.get('/:mountainId/hours', HoursController.getHours);
router.get('/:mountainId/hours/:id', HoursController.getHour);
router.put('/:mountainId/hours/:id', HoursController.updateHours);
router.delete('/:mountainId/hours/:id', HoursController.deleteHours);

export default router;