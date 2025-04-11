import { Router } from 'express'
import { updateComponent, updateCalculator, getOrders, postReview } from '../controllers/adminController.js'
const router = Router()

router.post('/component/:slug', updateComponent)
router.post('/calculator', updateCalculator)
router.get('/orders', getOrders)
router.post('/review', postReview)
export default router