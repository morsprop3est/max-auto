import Component from '../models/Component.js';
import Calculator from '../models/Calculator.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';

export const updateComponent = async (req, res) => {
  const { slug } = req.params;
  const data = req.body;
  try {
    const updated = await Component.update(data, { where: { slug } });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update component' });
  }
};

export const updateCalculator = async (req, res) => {
  const { formula, coeffs } = req.body;
  try {
    const calc = await Calculator.update({ formula, coeffs }, { where: {} });
    res.json(calc);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update calculator' });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const postReview = async (req, res) => {
  const { name, rating, comment, photo, regionId } = req.body;
  try {
    const review = await Review.create({ name, rating, comment, photo, regionId });
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
};