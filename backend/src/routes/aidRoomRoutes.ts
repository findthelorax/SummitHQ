import { Router } from 'express';
import AidRoomController from '../controllers/aidRoomController';

const router = Router();

router.post('/:mountainId/aidRooms', AidRoomController.createAidRoom);
router.get('/:mountainId/aidRooms', AidRoomController.getAidRooms);
router.get('/:mountainId/aidRooms/:id', AidRoomController.getAidRoom);
router.put('/:mountainId/aidRooms/:id', AidRoomController.updateAidRoom);
router.delete('/:mountainId/aidRooms/:id', AidRoomController.deleteAidRoom);

export default router;