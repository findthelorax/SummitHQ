import { Router } from 'express';
import EquipmentController from '../../controllers/mountains/equipmentController';

const router = Router();

// Routes for managing equipment at the mountain level
router.post('/:mountainId/equipment', EquipmentController.createEquipment);
router.get('/:mountainId/equipment', EquipmentController.getEquipments);
router.get('/:mountainId/equipment/:equipmentId', EquipmentController.getEquipment);
router.put('/:mountainId/equipment/:equipmentId', EquipmentController.updateEquipment);
router.delete('/:mountainId/equipment/:equipmentId', EquipmentController.deleteEquipment);

export default router;