import { Component, BodyType, FuelType } from '../models/index.js';

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

    res.status(200).json({
      ...groupedComponents,
      bodyTypes,
      fuelTypes,
    });
  } catch (error) {
    console.error('Error fetching components:', error);
    res.status(500).json({ error: 'Failed to fetch components' });
  }
};