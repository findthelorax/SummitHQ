import { Router } from 'express';
import EquipmentController from '../../controllers/equipmentController';

const router = Router();

// Routes for managing equipment at the mountain level
router.post('/:mountainID/equipment', EquipmentController.createEquipment);
router.get('/:mountainID/equipment', EquipmentController.getEquipments);
router.get('/:mountainID/equipment/:equipmentID', EquipmentController.getEquipment);
router.put('/:mountainID/equipment/:equipmentID', EquipmentController.updateEquipment);
router.delete('/:mountainID/equipment/:equipmentID', EquipmentController.deleteEquipment);

export default router;