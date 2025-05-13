import { Router } from 'express';
import IncidentEquipmentUseageLogController from '../../controllers/logs/incidentEquipmentUseageLogController';

const router = Router();

router.post('/:mountainId/incidents/:incidentId/equipmentUsageLogs', IncidentEquipmentUseageLogController.create);
router.get('/:mountainId/incidents/:incidentId/equipmentUsageLogs', IncidentEquipmentUseageLogController.getAll);
router.get('/:mountainId/incidents/:incidentId/equipmentUsageLogs/:logId', IncidentEquipmentUseageLogController.getById);
router.put('/:mountainId/incidents/:incidentId/equipmentUsageLogs/:logId', IncidentEquipmentUseageLogController.update);
router.delete('/:mountainId/incidents/:incidentId/equipmentUsageLogs/:logId', IncidentEquipmentUseageLogController.delete);

export default router;