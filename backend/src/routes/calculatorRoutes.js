import { Router } from 'express';
import { getCalculator } from '../controllers/calculatorController.js';

const router = Router();

router.get('/', getCalculator);

export default router;