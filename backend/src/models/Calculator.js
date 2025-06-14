import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

export default (sequelize) => {
return sequelize.define('Calculator', {
    name: DataTypes.STRING, // Назва конфігурації калькулятора
    mode: DataTypes.ENUM("full", "delivery"), // Режим розрахунку: повний (full) або тільки доставка (delivery)
    copartFeeTier: DataTypes.ENUM("high", "low"), // Тип тарифів Copart: високий (high) або низький (low)
    iaaiFeeTier: DataTypes.ENUM("high", "low"), // Тип тарифів IAAI: високий (high) або низький (low)
    addCopartFees: DataTypes.FLOAT, // Додаткові фіксовані збори для Copart
    addIaaiFees: DataTypes.FLOAT, // Додаткові фіксовані збори для IAAI
    inlandMarkupType: DataTypes.ENUM("fixed", "percent"), // Тип націнки на доставку всередині США: фіксована або відсоткова
    inlandMarkupValue: DataTypes.FLOAT, // Значення націнки на внутрішню доставку
    serviceFee: DataTypes.FLOAT, // Плата за послуги компанії
    buttonFee: DataTypes.FLOAT, // Плата за "кнопку" (Buy Now або інші сервіси)
    addOneYear: DataTypes.BOOLEAN, // Додавати +1 рік до віку авто (наприклад, для розмитнення)
    insurancePercent: DataTypes.FLOAT, // Відсоток страховки (наприклад, 3.3%)
    certificationFee: DataTypes.FLOAT, // Вартість сертифікації авто
    expeditionFee: DataTypes.FLOAT, // Вартість експедиції (оформлення/переміщення)
    brokerFee: DataTypes.FLOAT, // Плата брокеру за послуги
    electricPortExtra: DataTypes.FLOAT, // Додаткова плата для електрокарів у порту
    extraFees: DataTypes.FLOAT, // Інші додаткові збори (не передбачені окремими полями)
    deliveryFromPortCar: DataTypes.FLOAT, // Вартість доставки з порту до клієнта (для авто)
    deliveryFromPortMoto: DataTypes.FLOAT, // Вартість доставки з порту до клієнта (для мотоциклів)
    deliveryFromPortElectric: DataTypes.FLOAT, // Вартість доставки з порту до клієнта (для електрокарів)
    countSwiftFee: DataTypes.BOOLEAN, // Враховувати чи ні комісію SWIFT
    swiftFixed: DataTypes.FLOAT, // Фіксована частина комісії SWIFT
    swiftPercent: DataTypes.FLOAT, // Відсоткова частина комісії SWIFT
    extraFreightElectric: DataTypes.FLOAT, // Додатковий фрахт для електрокарів
    useBuyNow: DataTypes.BOOLEAN, // Використовувати чи ні Buy Now як спосіб купівлі
    showUSPayments: DataTypes.BOOLEAN, // Виводити оплату в США у фінальному розрахунку
    customsOutput: DataTypes.ENUM("short", "detailed"), // Формат виводу митного розрахунку: короткий (short) або детальний (detailed)
    inlandCopyFromId: DataTypes.INTEGER // ID іншого налаштування, з якого копіюється inland-доставка
  });
};