import { Router } from 'express';
import * as portController from '../controllers/portController.js';
import * as auctionController from '../controllers/auctionController.js';

const router = Router();

router.get('/ports', portController.getPorts);
router.get('/port-fees', portController.getPortFees);
router.put('/port-fees/:portId', portController.updatePortFee);

router.get('/auction-locations', auctionController.getAuctions);
router.get('/auction-fees', auctionController.getAuctionDeliveryFees);
router.put('/auction-fees/:auctionId', auctionController.updateAuctionDeliveryFee);
router.put('/auction-locations/:auctionId', auctionController.updateAuctionLocation);
router.post('/auction-location-port', auctionController.upsertAuctionLocationPort);
router.get('/auction-location-port', auctionController.getAuctionLocationPorts);
router.get('/auction-port-all', auctionController.getAllAuctionPortData);
router.post('/auction-locations/bulk', auctionController.bulkCreateAuctions);
router.post('/ports/bulk', portController.bulkCreatePorts);

export default router;