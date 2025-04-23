import { Router } from 'express';
import IncidentController from '../controllers/incidentController';

const router = Router();

router.post('/mountains/:mountainId/incidents', IncidentController.createIncident);
router.get('/mountains/:mountainId/incidents', IncidentController.getIncidents);
router.get('/incidents/:id', IncidentController.getIncident);
router.put('/incidents/:id', IncidentController.updateIncident);
router.delete('/incidents/:id', IncidentController.deleteIncident);

export default router;