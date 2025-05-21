import { Router } from 'express';
import EquipmentServiceLogController from '../../controllers/logs/equipmentServiceLogController.js';

const router = Router();

router.post('/:mountainId/equipment/:equipmentId/serviceLogs', EquipmentServiceLogController.create);
router.get('/:mountainId/equipment/:equipmentId/serviceLogs', EquipmentServiceLogController.getAll);
router.get('/:mountainId/equipment/:equipmentId/serviceLogs/:logId', EquipmentServiceLogController.getById);
router.put('/:mountainId/equipment/:equipmentId/serviceLogs/:logId', EquipmentServiceLogController.update);
router.delete('/:mountainId/equipment/:equipmentId/serviceLogs/:logId', EquipmentServiceLogController.delete);

export default router;