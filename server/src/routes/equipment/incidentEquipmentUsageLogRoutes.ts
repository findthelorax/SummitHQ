import { Router } from 'express';
import IncidentEquipmentUsageLogController from '../../controllers/logs/incidentEquipmentUsageLogController.js';

const router = Router();

router.post('/:mountainId/incidents/:incidentId/equipmentUsageLogs', IncidentEquipmentUsageLogController.create);
router.get('/:mountainId/incidents/:incidentId/equipmentUsageLogs', IncidentEquipmentUsageLogController.getAll);
router.get('/:mountainId/incidents/:incidentId/equipmentUsageLogs/:logId', IncidentEquipmentUsageLogController.getById);
router.put('/:mountainId/incidents/:incidentId/equipmentUsageLogs/:logId', IncidentEquipmentUsageLogController.update);
router.delete('/:mountainId/incidents/:incidentId/equipmentUsageLogs/:logId', IncidentEquipmentUsageLogController.delete);

export default router;