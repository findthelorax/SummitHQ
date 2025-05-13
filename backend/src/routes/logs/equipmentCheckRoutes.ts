import { Router } from 'express';
import EquipmentCheckController from '../../controllers/logs/equipmentCheckController';

const router = Router();

router.post('/:mountainId/equipment/:equipmentId/equipmentChecks', EquipmentCheckController.create);
router.get('/:mountainId/equipment/:equipmentId/equipmentChecks', EquipmentCheckController.getAll);
router.get('/:mountainId/equipment/:equipmentId/equipmentChecks/:equipmentCheckId', EquipmentCheckController.getById);
router.put('/:mountainId/equipment/:equipmentId/equipmentChecks/:equipmentCheckId', EquipmentCheckController.update);
router.delete('/:mountainId/equipment/:equipmentId/equipmentChecks/:equipmentCheckId', EquipmentCheckController.delete);

export default router;