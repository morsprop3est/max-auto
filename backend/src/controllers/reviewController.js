import { Review } from '../models/index.js';

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

export const getReviewsByRegion = async (req, res) => {
  const { regionId } = req.query;

  try {
    const reviews = await Review.findAll({ where: { regionId } });
    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews by region:', error);
    res.status(500).json({ error: 'Failed to fetch reviews by region' });
  }
};