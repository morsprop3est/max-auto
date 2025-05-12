import { Router } from 'express';
import { addAuctionLocations } from '../controllers/auctionLocationController.js';

const router = Router();

router.post('/', addAuctionLocations);

export default router;