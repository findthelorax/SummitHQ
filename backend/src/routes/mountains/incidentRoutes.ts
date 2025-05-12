import { Router } from 'express';
import IncidentController from '../../controllers/incidentController';

const router = Router();

router.post('/:mountainId/incidents', IncidentController.createIncident);
router.post('/:mountainId/incidents/:id/assign-employee', IncidentController.assignEmployee);
router.get('/:mountainId/incidents', IncidentController.findAllByMountain);
router.get('/:mountainId/incidents/:incidentId', IncidentController.findByIdAndMountain);
router.put('/:mountainId/incidents/:incidentId', IncidentController.updateByMountain);
router.delete('/:mountainId/incidents/:incidentId', IncidentController.deleteByMountain);

export default router;