import { Router } from 'express';
import { getAllReviews, getReviewsByRegion } from '../controllers/reviewController.js';

const router = Router();

router.get('/', getAllReviews);
router.get('/by-region', getReviewsByRegion);

export default router;