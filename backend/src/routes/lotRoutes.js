import { Router } from 'express';
import { getLots, postLot } from '../controllers/lotController.js';

const router = Router();

router.get('/', getLots);
router.post('/', postLot);

export default router;