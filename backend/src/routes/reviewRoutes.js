import { Router } from 'express';
import { getAllReviews, getReviewsByRegion, addUserPhoto, addReviewPhotos, getReviewPhotos, deleteReviewPhoto } from '../controllers/reviewController.js';
import { uploadSingleReview, uploadMultipleReviews } from '../middlewares/uploadMiddleware.js';


const router = Router();

router.get('/', getAllReviews);
router.get('/by-region', getReviewsByRegion);
router.post('/:reviewId/user-photo', uploadSingleReview, addUserPhoto);

router.post('/:reviewId/review-photos', uploadMultipleReviews, addReviewPhotos);

router.get('/:reviewId/review-photos', getReviewPhotos);
router.delete('/:reviewId/review-photos/:photoId', deleteReviewPhoto);

export default router;