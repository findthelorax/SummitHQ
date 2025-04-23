import { Router } from 'express';
import AidRoomController from '../controllers/aidRoomController';

const router = Router();

router.post('/mountains/:mountainId/aidRooms', AidRoomController.createAidRoom);
router.get('/mountains/:mountainId/aidRooms', AidRoomController.getAidRooms);
router.get('/aidRooms/:id', AidRoomController.getAidRoom);
router.put('/aidRooms/:id', AidRoomController.updateAidRoom);
router.delete('/aidRooms/:id', AidRoomController.deleteAidRoom);

export default router;