import { Op } from 'sequelize';
import { sequelize, Lot, BodyType, FuelType, LotPhoto } from '../models/index.js';
import fs from 'fs';
import path from 'path';

export const getLots = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      minPrice,
      maxPrice,
      bodyTypeSlug,
      fuelTypeSlug,
      minYear,
      maxYear,
      minOdometer,
      maxOdometer,
      minEngineSize,
      maxEngineSize,
      sortBy = "price", 
    } = req.query;

    const offset = (page - 1) * limit;

    const where = {};

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
    }

    if (minYear || maxYear) {
      where.year = {};
      if (minYear) where.year[Op.gte] = parseInt(minYear);
      if (maxYear) where.year[Op.lte] = parseInt(maxYear);
    }

    if (minOdometer || maxOdometer) {
      where.odometer = {};
      if (minOdometer) where.odometer[Op.gte] = parseInt(minOdometer);
      if (maxOdometer) where.odometer[Op.lte] = parseInt(maxOdometer);
    }

    if (minEngineSize || maxEngineSize) {
      where.engineSize = {};
      if (minEngineSize) where.engineSize[Op.gte] = parseFloat(minEngineSize);
      if (maxEngineSize) where.engineSize[Op.lte] = parseFloat(maxEngineSize);
    }

    const include = [
      {
        model: LotPhoto,
        as: 'photos',
        attributes: ['id', 'photoUrl'],
      },
    ];

    if (bodyTypeSlug) {
      include.push({
        model: BodyType,
        as: 'bodyType',
        where: { slug: bodyTypeSlug },
      });
    }

    if (fuelTypeSlug) {
      include.push({
        model: FuelType,
        as: 'fuelType',
        where: { slug: fuelTypeSlug },
      });
    }

    const order = [[sortBy, 'ASC']]; 

    const { rows: lots, count: totalLots } = await Lot.findAndCountAll({
      where,
      include,
      offset,
      limit: parseInt(limit),
      order,
    });

    res.status(200).json({ lots, totalLots });
  } catch (error) {
    console.error('Error fetching lots:', error);
    res.status(500).json({ error: 'Failed to fetch lots' });
  }
};

export const getLotPhotos = async (req, res) => {
  try {
    const { lotId } = req.params;
    const photos = await LotPhoto.findAll({ where: { lotId } });
    res.status(200).json(photos);
  } catch (error) {
    console.error('Error fetching lot photos:', error);
    res.status(500).json({ error: 'Failed to fetch lot photos' });
  }
};

export const addLotPhoto = async (req, res) => {
  try {
    const { lotId, photoUrl } = req.body;

    if (!lotId || !photoUrl) {
      return res.status(400).json({ error: 'lotId and photoUrl are required' });
    }

    const photo = await LotPhoto.create({ lotId, photoUrl });

    res.status(201).json(photo);
  } catch (error) {
    console.error('Error adding photo:', error);
    res.status(500).json({ error: 'Failed to add photo' });
  }
};

export const addLotPhotos = async (req, res) => {
  try {
    const { lotId } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const newPhotos = req.files.map((file) => ({
      lotId,
      photoUrl: `/uploads/lots/${lotId}/${file.originalname}`,
    }));

    const createdPhotos = await LotPhoto.bulkCreate(newPhotos);

    res.status(201).json({ photos: createdPhotos });
  } catch (error) {
    console.error('Error adding lot photos:', error);
    res.status(500).json({ error: 'Failed to add lot photos' });
  }
};

export const deleteLotPhoto = async (req, res) => {
  try {
    const { photoId } = req.params;

    const photo = await LotPhoto.findByPk(photoId);
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    const photoPath = path.join('uploads', 'lots', photo.lotId.toString(), path.basename(photo.photoUrl));
    if (fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
    }

    await photo.destroy();
    res.status(200).json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Error deleting lot photo:', error);
    res.status(500).json({ error: 'Failed to delete lot photo' });
  }
};

export const addBulkLots = async (req, res) => {
  try {
    const { lots } = req.body;

    if (!lots || !Array.isArray(lots)) {
      return res.status(400).json({ 
        error: 'Invalid request format. Expected an array of lots in the request body.' 
      });
    }

    // Validate each lot has required fields
    const requiredFields = ['title', 'price', 'year', 'bodyTypeId', 'fuelTypeId'];
    const invalidLots = lots.filter(lot => {
      return requiredFields.some(field => !lot[field]);
    });

    if (invalidLots.length > 0) {
      return res.status(400).json({
        error: 'Some lots are missing required fields',
        requiredFields,
        invalidLots
      });
    }

    const createdLots = await Lot.bulkCreate(lots);
    res.status(201).json({ 
      message: 'Lots created successfully', 
      count: createdLots.length,
      lots: createdLots 
    });
  } catch (error) {
    console.error('Error creating lots:', error);
    res.status(500).json({ error: 'Failed to create lots' });
  }
};