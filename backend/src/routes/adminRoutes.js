import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { getStats, updateComponent, updateCalculator, getOrders, postReview } from '../controllers/adminController.js'
const router = Router()

router.get('/stats', getStats)
router.post('/component/:slug', updateComponent)
router.post('/calculator', updateCalculator)
router.get('/orders', getOrders)
router.post('/review', postReview)
export default router