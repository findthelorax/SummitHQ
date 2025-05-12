import { Router } from 'express';
import { getAllData } from '../controllers/debugController';

const router = Router();

router.get('/all-data', getAllData);

export default router;