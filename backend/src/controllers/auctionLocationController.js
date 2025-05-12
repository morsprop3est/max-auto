import { AuctionLocation } from '../models/index.js';

export const addAuctionLocations = async (req, res) => {
  try {
    const locations = req.body;

    if (!Array.isArray(locations) || locations.length === 0) {
      return res.status(400).json({ error: 'Invalid data format. Expected an array of locations.' });
    }

    const createdLocations = await AuctionLocation.bulkCreate(locations, { ignoreDuplicates: true });

    res.status(201).json({
      success: true,
      message: 'Locations added successfully',
      locations: createdLocations,
    });
  } catch (error) {
    console.error('Error adding auction locations:', error);
    res.status(500).json({ error: 'Failed to add auction locations' });
  }
};