import Component from '../models/Component.js';
import Calculator from '../models/Calculator.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';

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
  try {
    const order = await Order.create({ name, phone, carDetails, totalPrice });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
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