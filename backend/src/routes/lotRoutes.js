import { Router } from 'express';
import { getLots, addLotPhoto, getLotPhotos, addLotPhotos, deleteLotPhoto, addBulkLots } from '../controllers/lotController.js';
import { uploadMultipleLots } from '../middlewares/uploadMiddleware.js';

const router = Router();

router.get('/', getLots);
router.post('/photos', addLotPhoto);
router.post('/bulk', addBulkLots);

router.get('/:lotId/photos', getLotPhotos);
router.post('/:lotId/photos', uploadMultipleLots, addLotPhotos);
router.delete('/:lotId/photos/:photoId', deleteLotPhoto);

export default router;