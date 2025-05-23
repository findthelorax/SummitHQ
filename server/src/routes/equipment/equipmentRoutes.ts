import { Router } from 'express';
import EquipmentController from '../../controllers/equipment/equipmentController.js';
import EquipmentCheckController from '../../controllers/logs/equipmentCheckController.js';

const router = Router();

router.post('/', EquipmentController.createEquipment);
router.get('/', EquipmentController.getEquipments);
router.get('/:equipmentId', EquipmentController.getEquipment);
router.put('/:equipmentId', EquipmentController.updateEquipment);
router.delete('/:equipmentId', EquipmentController.deleteEquipment);

router.post('/:equipmentId/assign/:mountainId', EquipmentController.assignEquipmentToMountain);
router.delete('/:equipmentId/remove/:mountainId', EquipmentController.removeEquipmentFromMountain);

router.post('/:equipmentId/assign-location/:mountainId/:locationId', EquipmentController.assignToLocation);
router.delete('/:equipmentId/remove-location/:mountainId/:locationId', EquipmentController.removeFromLocation);
router.post('/:equipmentId/move-location/:mountainId', EquipmentController.moveToLocation);

router.post('/:equipmentId/equipmentChecks', EquipmentCheckController.create);
router.get('/:equipmentId/equipmentChecks', EquipmentCheckController.getAll);
router.get('/:equipmentId/equipmentChecks/:equipmentCheckId', EquipmentCheckController.getById);
router.put('/:equipmentId/equipmentChecks/:equipmentCheckId', EquipmentCheckController.update);
router.delete('/:equipmentId/equipmentChecks/:equipmentCheckId', EquipmentCheckController.delete);

export default router;