import { Router } from 'express';
import AidRoomController from '../../controllers/mountains/aidRoomController';

const router = Router();

router.post('/:mountainId/aidRooms', AidRoomController.createAidRoom);
router.get('/:mountainId/aidRooms', AidRoomController.getAidRooms);
router.get('/:mountainId/aidRooms/:aidRoomId', AidRoomController.getAidRoom);
router.put('/:mountainId/aidRooms/:aidRoomId', AidRoomController.updateAidRoom);
router.delete('/:mountainId/aidRooms/:aidRoomId', AidRoomController.deleteAidRoom);

export default router;