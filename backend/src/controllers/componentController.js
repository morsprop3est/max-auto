import { Component } from '../models/index.js';

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

    res.status(200).json(groupedComponents);
  } catch (error) {
    console.error('Error fetching components:', error);
    res.status(500).json({ error: 'Failed to fetch components' });
  }
};