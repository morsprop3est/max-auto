import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copartConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/fees/copart.json'), 'utf8'));
const iaaiConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/fees/iaai.json'), 'utf8'));
const configPath = path.join(__dirname, '../config/calculator.json');

function getCalculatorConfig() {
  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

export function getAuctionDeliveryFee({ 
  auctionType, 
  lotPrice, 
  bodyType,
  copartCleanType,
  copartSecuredType,
  iaaiLicenseType,
  iaaiVolumeType
}) {
  const config = getCalculatorConfig();

  if (auctionType === 'copart') {
    const titleClean = copartCleanType || 'clean'; 
    const securedType = copartSecuredType || 'secured';
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

    const additionalFees = config.addCopartFees || 0;

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
      additionalFees,
      total: mainFee + gateFee + virtualBidFee + titleShipping + environmentalFee + additionalFees,
      breakdown: {
        mainFee,
        gateFee,
        virtualBidFee,
        titleShipping,
        environmentalFee,
        additionalFees
      }
    };
  }

  if (auctionType === 'iaai') {
    const volumeType = iaaiVolumeType || 'standart_volume';
    const licenseType = iaaiLicenseType || 'standart_licensed';
    const group = iaaiConfig[licenseType]?.[volumeType];
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

    const additionalFees = config.addIaaiFees || 0;

    return {
      auctionType: 'iaai',
      volumeType,
      licenseType,
      mainFee,
      mainFeeRow,
      serviceFee,
      environmentalFee,
      titleHandlingFee,
      additionalFees,
      total: mainFee + serviceFee + environmentalFee + titleHandlingFee + additionalFees,
      breakdown: {
        mainFee,
        serviceFee,
        environmentalFee,
        titleHandlingFee,
        additionalFees
      }
    };
  }

  return {
    auctionType,
    total: 0,
    breakdown: {}
  };
}