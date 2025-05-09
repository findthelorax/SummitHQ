import { Router } from 'express';
import IncidentController from '../../controllers/incidentController';

const router = Router();

router.post('/:mountainID/incidents', IncidentController.createIncident);
router.post('/:mountainID/incidents/:id/assign-employee', IncidentController.assignEmployee);
router.get('/:mountainID/incidents', IncidentController.findAllByMountain);
router.get('/:mountainID/incidents/:incidentID', IncidentController.findByIdAndMountain);
router.put('/:mountainID/incidents/:incidentID', IncidentController.updateByMountain);
router.delete('/:mountainID/incidents/:incidentID', IncidentController.deleteByMountain);

export default router;