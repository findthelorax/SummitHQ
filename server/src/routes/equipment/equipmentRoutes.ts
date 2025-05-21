import { Router } from 'express';
import EquipmentController from '../../controllers/equipment/equipmentController.js';
import EquipmentCheckController from '../../controllers/logs/equipmentCheckController.js';

const router = Router();

router.post('/:mountainId/equipment', EquipmentController.createEquipment);
router.get('/:mountainId/equipment', EquipmentController.getEquipments);
router.get('/:mountainId/equipment/:equipmentId', EquipmentController.getEquipment);
router.put('/:mountainId/equipment/:equipmentId', EquipmentController.updateEquipment);
router.delete('/:mountainId/equipment/:equipmentId', EquipmentController.deleteEquipment);

router.post('/:mountainId/equipment/:equipmentId/equipmentChecks', EquipmentCheckController.create);
router.get('/:mountainId/equipment/:equipmentId/equipmentChecks', EquipmentCheckController.getAll);
router.get('/:mountainId/equipment/:equipmentId/equipmentChecks/:equipmentCheckId', EquipmentCheckController.getById);
router.put('/:mountainId/equipment/:equipmentId/equipmentChecks/:equipmentCheckId', EquipmentCheckController.update);
router.delete('/:mountainId/equipment/:equipmentId/equipmentChecks/:equipmentCheckId', EquipmentCheckController.delete);

export default router;