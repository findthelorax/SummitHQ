import { Router } from 'express';
import IncidentController from '../../controllers/mountains/incidentController';

const router = Router();

router.post('/:mountainId/incidents', IncidentController.createIncident);
router.patch('/:mountainId/incidents/:incidentId/assign-employee', IncidentController.assignEmployee);
router.put('/:mountainId/incidents/:incidentId/update-employee', IncidentController.updateAssignedEmployee);
router.get('/:mountainId/incidents', IncidentController.findAllByMountain);
router.get('/:mountainId/incidents/:incidentId', IncidentController.findByIdAndMountain);
router.put('/:mountainId/incidents/:incidentId', IncidentController.updateByMountain);
router.delete('/:mountainId/incidents/:incidentId', IncidentController.deleteByMountain);

export default router;
