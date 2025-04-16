import { Component, Calculator, Review, Lot, Order } from '../models/index.js';
import { sendMessageToTelegram } from '../services/telegramService.js';
import { sendOrderToCRM } from '../services/crmService.js';

export const getComponents = async (req, res) => {
  try {
    const components = await Component.findAll();
    const calculator = await Calculator.findOne();
    const reviews = await Review.findAll();

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
  const { name, phone, lotIds, comment } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  try {
    const newOrder = await Order.create({
      name,
      phone,
      lotIds: Array.isArray(lotIds) ? lotIds : null, 
      comment: comment || null,
    });

    await sendMessageToTelegram({
      name,
      phone,
      lotIds: lotIds || [],
      comment: comment || '',
    });

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      order: newOrder,
    });
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

export const getReviewsByRegion = async (req, res) => {
  const { regionId } = req.query;

  try {
    const reviews = await Review.findAll({ where: { regionId } });
    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};


export const postLot = async (req, res) => {
  const {
    auctionType,
    baseSite,
    title,
    auctionDate,
    odometer,
    priceNew,
    priceFuture,
    reservePrice,
    costPriced,
    year,
    vehicleType,
    fuel,
    drive,
    transmission,
    color,
    status,
    engineSize,
    location,
    locationId,
    currency,
    link,
  } = req.body;

  if (
    !auctionType ||
    !baseSite ||
    !title ||
    !auctionDate ||
    !odometer ||
    !priceNew ||
    !year ||
    !vehicleType ||
    !fuel ||
    !drive ||
    !transmission ||
    !color ||
    !status ||
    !engineSize ||
    !location ||
    !locationId ||
    !currency ||
    !link
  ) {
    return res.status(400).json({ error: 'All required fields must be provided' });
  }

  try {
    const newLot = await Lot.create({
      auctionType,
      baseSite,
      title,
      auctionDate,
      odometer,
      priceNew,
      priceFuture,
      reservePrice,
      costPriced,
      year,
      vehicleType,
      fuel,
      drive,
      transmission,
      color,
      status,
      engineSize,
      location,
      locationId,
      currency,
      link,
    });

    res.status(201).json({
      success: true,
      message: 'Lot created successfully',
      lot: newLot,
    });
  } catch (error) {
    console.error('Error creating lot:', error);
    res.status(500).json({ error: 'Failed to create lot' });
  }
};