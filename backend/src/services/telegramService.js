import axios from 'axios';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Формирование сообщения для Telegram
export const formatTelegramMessage = ({ name, phone, carDetails, totalPrice }) => {
  return `New Order Received:
  - Name: ${name}
  - Phone: ${phone}
  - Car Details: ${carDetails}
  - Total Price: $${totalPrice}`;
};

// Отправка сообщения в Telegram
export const sendMessageToTelegram = async (orderData) => {
  const message = formatTelegramMessage(orderData);
  try {
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