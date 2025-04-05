import { Router } from 'express';
import { sendMessage } from '../controllers/telegramController.js';

const router = Router();

router.post('/send-message', sendMessage);

export default router;