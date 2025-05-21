import { Router } from 'express';
import AidRoomController from '../../controllers/mountains/aidRoomController.js';
import AidRoomCheckController from '../../controllers/logs/aidRoomCheckController.js';

const router = Router();

router.post('/:mountainId/aidRooms', AidRoomController.createAidRoom);
router.get('/:mountainId/aidRooms', AidRoomController.getAidRooms);
router.get('/:mountainId/aidRooms/:aidRoomId', AidRoomController.getAidRoom);
router.put('/:mountainId/aidRooms/:aidRoomId', AidRoomController.updateAidRoom);
router.delete('/:mountainId/aidRooms/:aidRoomId', AidRoomController.deleteAidRoom);

router.post('/:mountainId/aidRooms/:aidRoomId/aidRoomChecks', AidRoomCheckController.create);
router.get('/:mountainId/aidRooms/:aidRoomId/aidRoomChecks', AidRoomCheckController.getAll);
router.get('/:mountainId/aidRooms/:aidRoomId/aidRoomChecks/:aidRoomCheckId', AidRoomCheckController.getById);
router.put('/:mountainId/aidRooms/:aidRoomId/aidRoomChecks/:aidRoomCheckId', AidRoomCheckController.update);
router.delete('/:mountainId/aidRooms/:aidRoomId/aidRoomChecks/:aidRoomCheckId', AidRoomCheckController.delete);

export default router;