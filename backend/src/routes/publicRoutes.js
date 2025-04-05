import { Router } from 'express'
import { getComponents, getCalculator, postOrder, getReviews } from '../controllers/publicController.js'
const router = Router()
router.get('/components', getComponents)
router.get('/calculator', getCalculator)
router.post('/order', postOrder)
router.get('/reviews', getReviews)
export default router
