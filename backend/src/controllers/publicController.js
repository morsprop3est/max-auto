import Component from '../models/Component.js';
import Calculator from '../models/Calculator.js';
import { Order } from '../models/index.js';
import Review from '../models/Review.js';
import { sendMessageToTelegram } from '../services/telegramService.js';
import { sendOrderToCRM } from '../services/crmService.js';

export const getComponents = async (req, res) => {
  try {
    const components = await Component.findAll();
    res.json(components);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch components' });
  }
};

export const getCalculator = async (req, res) => {
  try {
    const calc = await Calculator.findOne();
    res.json(calc);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch calculator' });
  }
};

export const postOrder = async (req, res) => {
  const { name, phone, carDetails, totalPrice } = req.body;

  if (!name || !phone || !carDetails || !totalPrice) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newOrder = await Order.create({ name, phone, carDetails, totalPrice });

    await sendMessageToTelegram({ name, phone, carDetails, totalPrice });

    // await sendOrderToCRM({ name, phone, carDetails, totalPrice });

    res.status(200).json({ success: 'Order processed successfully', order: newOrder });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ error: 'Failed to process order' });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};