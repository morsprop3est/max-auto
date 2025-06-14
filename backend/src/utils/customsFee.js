export function calcCustomsUA({
  lotPrice,
  capacity, // об'єм двигуна (см³) або ємність батареї (кВт·год)
  fuelType,
  year,
  isEU = false,
  hasEUR1 = false,
  output = 'full'
}) {
  // 1. Митна вартість (ціна лота + доставка до кордону)
  const customsValue = lotPrice;

  // 2. Ввізне мито
  let importDuty = 0;
  if (
    fuelType !== 'electric' &&
    fuelType !== 'hybrid' &&
    !(isEU && hasEUR1)
  ) {
    importDuty = Math.round(customsValue * 0.1);
  }

  // 3. Вік авто (від 1 до 15 років)
  const currentYear = new Date().getFullYear();
  let age = currentYear - year;
  if (age < 1) age = 1;
  if (age > 15) age = 15;

  // 4. Акцизний податок
  let excise = 0;
  if (fuelType === 'petrol' || fuelType === 'gasoline') {
    const rate = capacity > 3000 ? 100 : 50; // євро
    excise = rate * age * (capacity / 1000);
  } else if (fuelType === 'diesel') {
    const rate = capacity > 3500 ? 150 : 75;
    excise = rate * age * (capacity / 1000);
  } else if (fuelType === 'electric') {
    excise = (capacity || 1) * 1; // 1 євро за 1 кВт·год
  } else if (fuelType === 'hybrid') {
    excise = 100; // фіксовано
  }

  // 5. ПДВ (20%), для електро — 0%
  let vat = 0;
  if (fuelType !== 'electric') {
    vat = Math.round((customsValue + importDuty + excise) * 0.2);
  }

  // 6. Разом
  const total = Math.round(importDuty + excise + vat);

  if (output === 'short') {
    return { total };
  }
  return {
    total,
    importDuty,
    excise,
    vat
  };
}