import { Router } from 'express';
import EquipmentController from '../controllers/equipmentController';

const router = Router();

router.post('/equipment', EquipmentController.createEquipment);
router.get('/equipment', EquipmentController.getEquipments);
router.get('/equipment/:id', EquipmentController.getEquipment);
router.put('/equipment/:id', EquipmentController.updateEquipment);
router.delete('/equipment/:id', EquipmentController.deleteEquipment);

export default router;