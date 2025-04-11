import { Router } from 'express'
import { getComponents, getCalculator, postOrder, getReviews, postLot } from '../controllers/publicController.js'
const router = Router()
router.get('/components', getComponents)
router.get('/calculator', getCalculator)
router.post('/order', postOrder)
router.get('/reviews', getReviews)
router.post('/lot', postLot);

export default router
