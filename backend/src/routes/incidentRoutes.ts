import { Router } from 'express';
import IncidentController from '../controllers/incidentController';

const router = Router();

router.post('/:mountainId/incidents', IncidentController.createIncident);
router.get('/:mountainId/incidents', IncidentController.getIncidents);
router.get('/:mountainId/incidents/:id', IncidentController.getIncident);
router.put('/:mountainId/incidents/:id', IncidentController.updateIncident);
router.delete('/:mountainId/incidents/:id', IncidentController.deleteIncident);

export default router;