import { Router } from 'express';
import HoursController from '../../controllers/mountains/hoursController.js';

const router = Router();

router.post('/:mountainId/hours', HoursController.createHours);
router.get('/:mountainId/hours', HoursController.getHours);
router.get('/:mountainId/hours/:hoursId', HoursController.getHour);
router.put('/:mountainId/hours/:hoursId', HoursController.updateHours);
router.delete('/:mountainId/hours/:hoursId', HoursController.deleteHours);

export default router;