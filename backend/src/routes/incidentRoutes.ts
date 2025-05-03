import { Router } from 'express';
import IncidentController from '../controllers/incidentController';

const router = Router();

router.post('/:mountainId/incidents', IncidentController.createIncident);
router.post('/:mountainId/incidents/:id/assign-employee', IncidentController.assignEmployee);
router.get('/:mountainId/incidents', IncidentController.findAllByMountain);
router.get('/:mountainId/incidents/:id', IncidentController.findByIdAndMountain);
router.put('/:mountainId/incidents/:id', IncidentController.updateByMountain);
router.delete('/:mountainId/incidents/:id', IncidentController.deleteByMountain);

export default router;