import { Component, BodyType, FuelType, AuctionLocation } from '../models/index.js';

export const getComponents = async (req, res) => {
  try {
    const components = await Component.findAll();

    const groupedComponents = components.reduce((acc, component) => {
      const group = component.group || 'ungrouped'; 
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(component);
      return acc;
    }, {});

    const bodyTypes = await BodyType.findAll({
      attributes: ['id', 'name', 'slug'],
    });

    const fuelTypes = await FuelType.findAll({
      attributes: ['id', 'name', 'slug'],
    });

    const auctionLocations = await AuctionLocation.findAll();
    const groupedAuctions = auctionLocations.reduce((acc, location) => {
      const type = location.auctionType;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(location);
      return acc;
    }, {});

    res.status(200).json({
      ...groupedComponents,
      bodyTypes,
      fuelTypes,
      auctions: groupedAuctions
    });
  } catch (error) {
    console.error('Error fetching components:', error);
    res.status(500).json({ error: 'Failed to fetch components' });
  }
};