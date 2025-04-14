import { Router } from 'express';
import { getLots } from '../controllers/lotController.js';

const router = Router();

router.get('/lots', getLots);

export default router;