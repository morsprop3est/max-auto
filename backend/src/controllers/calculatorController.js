import { Calculator } from '../models/index.js';

export const getCalculator = async (req, res) => {
  try {
    const calculator = await Calculator.findOne();
    res.status(200).json(calculator);
  } catch (error) {
    console.error('Error fetching calculator:', error);
    res.status(500).json({ error: 'Failed to fetch calculator' });
  }
};