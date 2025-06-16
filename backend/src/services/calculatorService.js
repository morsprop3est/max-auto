import { Port, PortFee, AuctionLocation, AuctionDeliveryFee, AuctionLocationPort } from '../models/index.js'
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import { calcCustomsUA } from '../utils/customsFee.js'
import { getAuctionDeliveryFee } from '../utils/auctionFee.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, '../config/calculator.json');

export async function calculateCarPrice({
  lotPrice,
  auctionLocationId,
  bodyType,
  fuelType,
  year, 
  capacity,   
  otherOptions = {}
}) {

  function getCalculatorConfig() {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }

  const calculatorConfig = getCalculatorConfig();

  // 1. Знайти аукціонну локацію
  const auctionLocation = await AuctionLocation.findByPk(auctionLocationId)
  if (!auctionLocation) throw new Error('Auction location not found')

  // 2. Знайти порт, прив'язаний до аукціону (через зв'язок)
  const auctionPortLink = await AuctionLocationPort.findOne({ where: { auctionLocationId } })
  const portId = auctionPortLink?.portId || auctionLocation.portId 
  const port = portId ? await Port.findByPk(portId) : null

  // 3. Витягнути фі для порту та аукціону
  const portFee = portId ? await PortFee.findOne({ where: { portId } }) : null

  // 4. Визначити фі для кузова
  let portFeeValue = 0
  if (portFee) {
    if (bodyType === 'crossover') portFeeValue = portFee.crossoverFee
    else if (bodyType === 'suv') portFeeValue = portFee.suvFee
    else if (bodyType === 'moto') portFeeValue = portFee.motoFee
    else if (fuelType === 'hybrid' || fuelType === 'electric') portFeeValue = portFee.hybridFee
    else portFeeValue = portFee.carFee
  }

  // 5. Аукціонний збір з конфіга (Copart/IAAI)
  let AuctionDeliveryFeeDetail = getAuctionDeliveryFee({
    auctionType: auctionLocation.auctionType,
    lotPrice,
    bodyType,
    copartCleanType: calculatorConfig.copartCleanType,
    copartSecuredType: calculatorConfig.copartSecuredType,
    iaaiLicenseType: calculatorConfig.iaaiLicenseType,
    iaaiVolumeType: calculatorConfig.iaaiVolumeType
  });
  let auctionConfigFee = AuctionDeliveryFeeDetail.total;

  // 6. Доставка по США 
  const auctionDeliveryFeeRow = await AuctionDeliveryFee.findOne({ where: { auctionLocationId } });

  let inlandDelivery = 0;
  if (auctionDeliveryFeeRow) {
    if (bodyType === 'moto') inlandDelivery = auctionDeliveryFeeRow.motoFee;
    else if (bodyType === 'suv') inlandDelivery = auctionDeliveryFeeRow.suvFee;
    else inlandDelivery = auctionDeliveryFeeRow.carFee;
  }
  if (fuelType === 'electric' || fuelType === 'hybrid') inlandDelivery += calculatorConfig.electricPortExtra || 0;

  if (calculatorConfig.inlandMarkupType === 'percent') {
    inlandDelivery += Math.round(inlandDelivery * (calculatorConfig.inlandMarkupValue / 100));
  } else if (calculatorConfig.inlandMarkupType === 'fixed') {
    inlandDelivery += calculatorConfig.inlandMarkupValue;
  }

  // 7. Море/залізниця (беремо з порту)
  let seaDelivery = portFeeValue;
  
  // 8. Доставка з порту
  let portDelivery = 0;
  if (bodyType === 'moto') {
    portDelivery = calculatorConfig.deliveryFromPortMoto;
  } else {
    portDelivery = calculatorConfig.deliveryFromPortCar;
    if (fuelType === 'electric') {
      portDelivery += calculatorConfig.deliveryFromPortElectric;
    }
  }

  // 9. Комісія за переказ
  const baseAmountForSwift = lotPrice + auctionConfigFee + inlandDelivery + seaDelivery;
  const transferFee = calculatorConfig.countSwiftFee
    ? Math.round(calculatorConfig.swiftFixed + baseAmountForSwift * (calculatorConfig.swiftPercent / 100))
    : 0;

  // 10. Розмитнення (використовуємо утиліту та customsOutput з конфіга)
  const adjustedYear = calculatorConfig.addOneYear ? (year + 1) : year;
  const customs = calcCustomsUA({
    lotPrice: lotPrice + inlandDelivery + seaDelivery,
    capacity, 
    fuelType,
    year: adjustedYear ?? otherOptions.year,
    output: calculatorConfig.customsOutput || 'short'
  })

  // 11. Страховка
  const insuranceFee = Math.round((lotPrice + auctionConfigFee) * (calculatorConfig.insurancePercent / 100))

  // 12. Послуги компанії, експедиція, брокер, стоянка, кнопка
  const companyService = calculatorConfig.serviceFee
  const expedition = calculatorConfig.expeditionFee
  const broker = calculatorConfig.brokerFee
  const parking = calculatorConfig.extraFees
  const buttonFee = calculatorConfig.buttonFee || 0

  // 13. Разом
  const customsTotal = typeof customs === 'object' && customs.total !== undefined ? customs.total : customs
  const total =
    lotPrice +
    auctionConfigFee +
    inlandDelivery +
    seaDelivery +
    portDelivery +
    transferFee +
    customsTotal +
    insuranceFee +
    companyService +
    expedition +
    broker +
    parking +
    buttonFee

  return {
    total,
    portName: port?.name || null,
    auctionLocationName: auctionLocation?.name || null,
    breakdown: {
      lotPrice,
      AuctionDeliveryFee: auctionConfigFee,
      AuctionDeliveryFeeDetail,
      inlandDelivery,
      seaDelivery,
      portDelivery,
      transferFee,
      customs,
      insurance: insuranceFee,
      companyService,
      expedition,
      broker,
      parking,
      buttonFee
    }
  }
}