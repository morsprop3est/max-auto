import { Lot } from '../models/index.js';

export const getLots = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query; 
    const limit = parseInt(size, 10); 
    const offset = (parseInt(page, 10) - 1) * limit;

    const { rows: lots, count: total } = await Lot.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      success: true,
      page: parseInt(page, 10),
      size: limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data: lots,
    });
  } catch (error) {
    console.error('Error fetching lots:', error);
    res.status(500).json({ error: 'Failed to fetch lots' });
  }
};