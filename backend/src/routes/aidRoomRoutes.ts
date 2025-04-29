import { Router } from 'express';
import AidRoomController from '../controllers/aidRoomController';

const router = Router();

router.post('/aidRooms', AidRoomController.createAidRoom);
router.get('/aidRooms', AidRoomController.getAidRooms);
router.get('/aidRooms/:id', AidRoomController.getAidRoom);
router.put('/aidRooms/:id', AidRoomController.updateAidRoom);
router.delete('/aidRooms/:id', AidRoomController.deleteAidRoom);

export default router;