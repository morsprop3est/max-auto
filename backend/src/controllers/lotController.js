import { Lot } from '../models/index.js';

export const getLots = async (req, res) => {
  try {
    const lots = await Lot.findAll();
    res.status(200).json({ lots });
  } catch (error) {
    console.error('Error fetching lots:', error);
    res.status(500).json({ error: 'Failed to fetch lots' });
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