import axios from 'axios';
import { Lot } from '../models/index.js';

const API_URL = process.env.AUCTION_API_URL; 
const API_KEY = process.env.AUCTION_API_KEY;

export const fetchAndSaveLots = async (site) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        buy_now: true,
        site,
      },
      headers: {
        'api-key': API_KEY,
      },
    });

    const lots = response.data.data;

    for (const lot of lots) {
      const existingLot = await Lot.findOne({ where: { id: lot.lot_id } });

      if (!existingLot) {
        await Lot.create({
          id: lot.lot_id,
          auctionType: lot.auction_type,
          baseSite: lot.base_site,
          title: lot.title,
          auctionDate: lot.auction_date,
          odometer: lot.odometer,
          priceNew: lot.price_new,
          priceFuture: lot.price_future,
          reservePrice: lot.reserve_price,
          costPriced: lot.cost_priced,
          year: lot.year,
          vehicleType: lot.vehicle_type,
          fuel: lot.fuel,
          drive: lot.drive,
          transmission: lot.transmission,
          color: lot.color,
          status: lot.status,
          engineSize: lot.engine_size,
          location: lot.location,
          locationId: lot.location_id,
          currency: lot.currency,
          link: lot.link,
        });
      }
    }

    console.log(`Lots from site ${site} have been successfully updated.`);
  } catch (error) {
    console.error(`Error fetching lots from site ${site}:`, error);
  }
};