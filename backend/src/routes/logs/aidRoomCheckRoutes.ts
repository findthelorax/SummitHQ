import { Router } from 'express';
import AidRoomCheckController from '../../controllers/logs/aidRoomCheckController';

const router = Router();

router.post('/:mountainId/aidRooms/:aidRoomId/aidRoomChecks', AidRoomCheckController.create);
router.get('/:mountainId/aidRooms/:aidRoomId/aidRoomChecks', AidRoomCheckController.getAll);
router.get('/:mountainId/aidRooms/:aidRoomId/aidRoomChecks/:aidRoomCheckId', AidRoomCheckController.getById);
router.put('/:mountainId/aidRooms/:aidRoomId/aidRoomChecks/:aidRoomCheckId', AidRoomCheckController.update);
router.delete('/:mountainId/aidRooms/:aidRoomId/aidRoomChecks/:aidRoomCheckId', AidRoomCheckController.delete);

export default router;