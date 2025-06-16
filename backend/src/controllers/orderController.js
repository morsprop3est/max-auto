import { Order } from '../models/index.js';
import { sendMessageToTelegram } from '../services/telegramService.js';
import { sendOrderToCRM } from '../services/crmService.js';

export const postOrder = async (req, res) => {
  const { name, phone, lotIds, comment, utmParams } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  try {
    const newOrder = await Order.create({
      name,
      phone,
      comment: comment || null,
    });

    await sendMessageToTelegram({
      name,
      phone,
      comment: comment || '',
    });

    await sendOrderToCRM({
      name,
      phone,
      comment: comment || '',
      ...(utmParams && {
        prodex24source: utmParams.prodex24source,
        prodex24medium: utmParams.prodex24medium,
        prodex24campaign: utmParams.prodex24campaign,
        prodex24content: utmParams.prodex24content,
        prodex24term: utmParams.prodex24term,
        prodex24page: utmParams.prodex24page,
        prodex24source_full: utmParams.prodex24source_full
      })
    });

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      order: newOrder,
    });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ error: 'Failed to process order' });
  }
};