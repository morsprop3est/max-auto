import { Order } from '../models/index.js';
import { Component, Calculator, Review, Stat } from '../models/index.js';
import { sendMessageToTelegram } from '../services/telegramService.js';
import { sendOrderToCRM } from '../services/crmService.js';

export const getComponents = async (req, res) => {
  try {
    const components = await Component.findAll();
    const calculator = await Calculator.findOne();
    const reviews = await Review.findAll();
    const stats = await Stat.findAll();

    const groupedComponents = components.reduce((acc, component) => {
      const group = component.group;
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push({
        slug: component.slug,
        text: component.text,
        photoUrl: component.photoUrl,
        videoUrl: component.videoUrl,
      });
      return acc;
    }, {});

    groupedComponents.calculator = calculator
      ? {
          formula: calculator.formula,
          coeffs: calculator.coeffs,
        }
      : null;

    groupedComponents.reviews = reviews.map((review) => ({
      name: review.name,
      rating: review.rating,
      comment: review.comment,
      photo: review.photo,
    }));

    groupedComponents.stats = stats.map((stat) => ({
      name: stat.name,
      value: stat.value,
    }));

    res.json(groupedComponents);
  } catch (error) {
    console.error('Error fetching components:', error);
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