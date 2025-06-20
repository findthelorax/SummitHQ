import { Router } from 'express';
import { getAllData, deleteAllData } from '../controllers/debugController.js';

const router = Router();

router.get('/all-data', getAllData);
router.delete('/all-data', deleteAllData);


export default router;