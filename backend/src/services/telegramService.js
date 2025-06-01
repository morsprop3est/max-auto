import axios from 'axios';
import { Lot } from '../models/index.js';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export const formatTelegramMessage = async ({ name, phone, lotIds, comment }) => {
  let lotDetails = '';

  if (Array.isArray(lotIds) && lotIds.length > 0) {
    const lots = await Lot.findAll({ where: { id: lotIds } });

    lotDetails = lots
      .map(
        (lot) =>
          `  - ID: ${lot.id}\n    Назва: ${lot.title}\n    Ціна: ${lot.priceNew} ${lot.currency}\n    Локація: ${lot.location}`
      )
      .join('\n\n');
  } else {
    lotDetails = '  - Лоти не вказані';
  }

  return `Нове замовлення:
  - Ім'я: ${name}
  - Телефон: ${phone}
  - Коментар: ${comment || 'Відсутній'}`;
};

export const sendMessageToTelegram = async (orderData) => {
  try {
    const message = await formatTelegramMessage(orderData);
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });
    console.log('Message sent to Telegram');
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    throw new Error('Failed to send message to Telegram');
  }
};