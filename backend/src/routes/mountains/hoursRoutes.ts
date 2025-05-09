import { Router } from 'express';
import HoursController from '../../controllers/hoursController';

const router = Router();

router.post('/:mountainID/hours', HoursController.createHours);
router.get('/:mountainID/hours', HoursController.getHours);
router.get('/:mountainID/hours/:hoursID', HoursController.getHour);
router.put('/:mountainID/hours/:hoursID', HoursController.updateHours);
router.delete('/:mountainID/hours/:hoursID', HoursController.deleteHours);

export default router;