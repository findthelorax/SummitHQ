import { Router } from 'express';
import EquipmentController from '../controllers/equipmentController';

const router = Router();

router.post('/:mountainId/equipment', EquipmentController.createEquipment);
router.get('/:mountainId/equipment', EquipmentController.getEquipments);
router.get('/:mountainId/equipment/:id', EquipmentController.getEquipment);
router.put('/:mountainId/equipment/:id', EquipmentController.updateEquipment);
router.delete('/:mountainId/equipment/:id', EquipmentController.deleteEquipment);

export default router;