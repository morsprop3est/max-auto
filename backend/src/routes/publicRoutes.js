import { Router } from 'express'
import { getComponents, getCalculator, postOrder, getReviews, postLot, getReviewsByRegion } from '../controllers/publicController.js'
const router = Router()
router.get('/components', getComponents)
router.get('/calculator', getCalculator)
router.post('/order', postOrder)
router.get('/reviews', getReviewsByRegion);
router.post('/lot', postLot);

export default router
