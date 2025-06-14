import copartConfig from '../config/fees/copart.json' assert { type: "json" };
import iaaiConfig from '../config/fees/iaai.json' assert { type: "json" };
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configPath = path.join(__dirname, '../config/calculator.json');
function getCalculatorConfig() {
  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

export function getAuctionDeliveryFee({ auctionType, lotPrice, bodyType }) {
  const config = getCalculatorConfig();

  if (auctionType === 'copart') {
    const titleClean = config.copartTitleType || 'clean'; 
    const securedType = config.copartSecuredType || 'secured';
    const vehicleType = bodyType === 'truck' ? 'heavy_vehicle' : 'standard_vehicle';

    const mainGroup = copartConfig[titleClean]?.[vehicleType]?.[securedType];
    let mainFee = 0;
    let mainFeeRow = null;
    if (mainGroup) {
      for (const row of mainGroup) {
        if (
          (row.min === undefined || lotPrice >= row.min) &&
          (row.max === undefined || row.max === null || lotPrice <= row.max)
        ) {
          mainFee = row.fee ?? Math.round(lotPrice * (row.fee_percent / 100));
          mainFeeRow = row;
          break;
        }
      }
    }

    const gateFee = copartConfig.gate_fee || 0;

    let virtualBidFee = 0;
    const liveBidArr = copartConfig.virtual_bid_fee?.live_bid || [];
    for (const row of liveBidArr) {
      if (
        (row.min === undefined || lotPrice >= row.min) &&
        (row.max === undefined || row.max === null || lotPrice <= row.max)
      ) {
        virtualBidFee = row.fee ?? Math.round(lotPrice * (row.fee_percent / 100));
        break;
      }
    }

    const titleShipping = copartConfig.title_shipping?.usps?.fee || 0;

    const environmentalFee = copartConfig.environmental_fee || 0;


    return {
      auctionType: 'copart',
      titleType: titleClean,
      securedType,
      vehicleType,
      mainFee,
      mainFeeRow,
      gateFee,
      virtualBidFee,
      titleShipping,
      environmentalFee,
      total: mainFee + gateFee + virtualBidFee + titleShipping + environmentalFee,
      breakdown: {
        mainFee,
        gateFee,
        virtualBidFee,
        titleShipping,
        environmentalFee
      }
    };
  }

  if (auctionType === 'iaai') {
    const feeTier = config.iaaiFeeTier === 'high' ? 'high_volume' : 'standard_volume';
    const licenseType = 'standard_licensed'; 
    const group = iaaiConfig[licenseType]?.[feeTier];
    let mainFee = 0;
    let mainFeeRow = null;
    if (group) {
      for (const row of group) {
        if (
          (row.min === undefined || lotPrice >= row.min) &&
          (row.max === undefined || row.max === null || lotPrice <= row.max)
        ) {
          mainFee = row.fee ?? Math.round(lotPrice * (row.fee_percent / 100));
          mainFeeRow = row;
          break;
        }
      }
    }

    const serviceFee = iaaiConfig.service_fee || 0;
    const environmentalFee = iaaiConfig.environmental_fee || 0;
    const titleHandlingFee = iaaiConfig.title_handling_fee || 0;

    return {
      auctionType: 'iaai',
      feeTier,
      licenseType,
      mainFee,
      mainFeeRow,
      serviceFee,
      environmentalFee,
      titleHandlingFee,
      total: mainFee + serviceFee + environmentalFee + titleHandlingFee,
      breakdown: {
        mainFee,
        serviceFee,
        environmentalFee,
        titleHandlingFee
      }
    };
  }

  return {
    auctionType,
    total: 0,
    breakdown: {}
  };
}