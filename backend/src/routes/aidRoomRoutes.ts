import { Router } from 'express';
import AidRoomController from '../controllers/aidRoomController';

const router = Router();

router.post('/:mountainID/aidRooms', AidRoomController.createAidRoom);
router.get('/:mountainID/aidRooms', AidRoomController.getAidRooms);
router.get('/:mountainID/aidRooms/:aidRoomID', AidRoomController.getAidRoom);
router.put('/:mountainID/aidRooms/:aidRoomID', AidRoomController.updateAidRoom);
router.delete('/:mountainID/aidRooms/:aidRoomID', AidRoomController.deleteAidRoom);

export default router;