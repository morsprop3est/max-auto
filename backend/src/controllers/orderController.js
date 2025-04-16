import { Order } from '../models/index.js';
import { sendMessageToTelegram } from '../services/telegramService.js';

export const postOrder = async (req, res) => {
  const { name, phone, lotIds, comment } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  try {
    const newOrder = await Order.create({
      name,
      phone,
      lotIds: Array.isArray(lotIds) ? lotIds : null,
      comment: comment || null,
    });

    await sendMessageToTelegram({
      name,
      phone,
      lotIds: lotIds || [],
      comment: comment || '',
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