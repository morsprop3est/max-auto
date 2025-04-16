import { Router } from 'express';
import { getComponents } from '../controllers/componentController.js';

const router = Router();

router.get('/', getComponents);

export default router;