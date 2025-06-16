import { sequelize, Component, Region, Review, AuctionLocation, Port, AuctionLocationPort, BodyType, FuelType, AuctionDeliveryFee } from './models/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const auctionLocationsFull = JSON.parse(fs.readFileSync(path.join(__dirname, 'config', 'auctions.json'), 'utf8'));
const ports = JSON.parse(fs.readFileSync(path.join(__dirname, 'config', 'ports.json'), 'utf8'));

const seedDatabase = async () => {
  try {
    await sequelize.sync();

    console.log('Disabling foreign key checks...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

    console.log('Clearing tables...');
    await Component.destroy({ where: {}, truncate: true });
    await Review.destroy({ where: {}, truncate: true });
    await Region.destroy({ where: {}, truncate: true });
    await AuctionLocationPort.destroy({ where: {}, truncate: true });
    await AuctionDeliveryFee.destroy({ where: {}, truncate: true });
    await AuctionLocation.destroy({ where: {}, truncate: true });
    await Port.destroy({ where: {}, truncate: true });
    await BodyType.destroy({ where: {}, truncate: true });
    await FuelType.destroy({ where: {}, truncate: true });
    console.log('Tables cleared.');

    console.log('Enabling foreign key checks...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

    console.log('Seeding ports...');
    await Port.bulkCreate(ports);
    console.log('Default ports added.');

    console.log('Seeding auction locations and delivery fees...');
    for (const auctionData of auctionLocationsFull) {
      if (!auctionData.name || !auctionData.auctionType) continue;

      const [auctionLocation, created] = await AuctionLocation.findOrCreate({
        where: { name: auctionData.name, auctionType: auctionData.auctionType },
        defaults: { name: auctionData.name, auctionType: auctionData.auctionType }
      });

      if (auctionData.port) {
        const [port, portCreated] = await Port.findOrCreate({
          where: { name: auctionData.port },
          defaults: { name: auctionData.port }
        });
        auctionLocation.portId = port.id;
        await auctionLocation.save();
        await AuctionLocationPort.findOrCreate({
          where: { auctionLocationId: auctionLocation.id, portId: port.id },
          defaults: { auctionLocationId: auctionLocation.id, portId: port.id }
        });
      } else {
        auctionLocation.portId = null;
        await auctionLocation.save();
      }

      const carFee = auctionData.fee?.car || 0;
      const suvFee = auctionData.fee?.suv || 0;
      const motoFee = auctionData.fee?.moto || 0;

      await AuctionDeliveryFee.upsert({
        auctionLocationId: auctionLocation.id,
        carFee: carFee,
        suvFee: suvFee,
        motoFee: motoFee
      });
    }
    console.log('Default auction locations and delivery fees added.');

    console.log('Seeding components...');
    await Component.bulkCreate([
      { group: 'main', slug: 'main_h1', text: 'MAKS AUTO' },
      { group: 'main', slug: 'main_h2', text: 'Авто з Європи та США під ключ!' },
      { group: 'main', slug: 'main_p1', text: 'Привеземо для вас авто з Європи та США за вигідною ціною! Замовляйте мрію вже сьогодні!' },
      { group: 'main', slug: 'main_button', text: 'Хочу замовити!' },

      { group: 'about_us', slug: 'about_us_h1', text: 'Про нас' },
      { group: 'about_us', slug: 'about_us_p1', text: 'Ми спеціалізуємось на підборі, доставці та оформленні авто з Європи та США. Працюємо чесно, швидко та без зайвих клопотів для вас. Перевіряємо кожен автомобіль перед покупкою, щоб ви отримали тільки найкращі варіанти.' },
      { group: 'about_us', slug: 'about_us_stat_1', text: 'Великий вибір авто під замовлення' },
      { group: 'about_us', slug: 'about_us_stat_2', text: 'Прозорість на всіх етапах угоди' },
      { group: 'about_us', slug: 'about_us_stat_3', text: 'Офіційне оформлення та страхування' },
      { group: 'about_us', slug: 'about_us_stat_4', text: 'Доставка у будь-який регіон України' },

      { group: 'service', slug: 'service_h1_1', text: 'Пошук авто' },
      { group: 'service', slug: 'service_p1_1', text: 'Допоможемо обрати авто з США або Європи відповідно до ваших критеріїв. Працюємо лише з перевіреними продавцями та аукціонами.' },
      { group: 'service', slug: 'service_h1_2', text: 'Доставка' },
      { group: 'service', slug: 'service_p1_2', text: 'Повністю організовуємо транспортування авто з будь-якої країни до України — наземна логістика, морський фрахт, портове оформлення.' },
      { group: 'service', slug: 'service_h1_3', text: 'Розмитнення та сертифікація' },
      { group: 'service', slug: 'service_p1_3', text: 'Оформлюємо всі митні документи, сертифікати відповідності та готуємо авто до реєстрації згідно з українським законодавством.' },
      { group: 'service', slug: 'service_h1_4', text: 'Юридичний супровід' },
      { group: 'service', slug: 'service_p1_4', text: 'Беремо на себе весь процес оформлення документів — від купівлі до постановки на облік. Вам не доведеться стояти в чергах.' },
      { group: 'service', slug: 'service_h1_5', text: 'Сервіс' },
      { group: 'service', slug: 'service_p1_5', text: 'Допоможемо з ремонтом, діагностикою, страхуванням та підготовкою авто до експлуатації в Україні.' },      
      { group: 'service', slug: 'service_h1', text: 'Наші послуги'},
      { group: 'service', slug: 'service_p1', text: 'Ми пропонуємо повний комплекс послуг, щоб ви отримали своє авто швидко, вигідно та без зайвих клопотів. MAKS AUTO супроводжує кожен етап – від підбору до повного оформлення в Україні.', photoUrl: null },

      { group: 'stats', slug: 'stat_h1_1', text: '8+'},
      { group: 'stats', slug: 'stat_p1_1', text: 'років досвіду на ринку'},
      { group: 'stats', slug: 'stat_h1_2', text: '1,234'},
      { group: 'stats', slug: 'stat_p1_2', text: 'задоволених клієнтів'},
      { group: 'stats', slug: 'stat_h1_3', text: '5 тис'},
      { group: 'stats', slug: 'stat_p1_3', text: 'доставлених автомобілів' },
      { group: 'stats', slug: 'stat_h1_4', text: '21 день' },
      { group: 'stats', slug: 'stat_p1_4', text: 'середній час доставки' },

      { group: 'millitary', slug: 'millitary_h1', text: 'Допомага військовим' },
      { group: 'millitary', slug: 'millitary_p1', text: 'MAKS AUTO не лише допомагає цивільним знайти ідеальне авто, а й активно працює для наших захисників. Ми організовуємо доставку надійних військових позашляховиків, пікапів і спеціалізованих авто з Європи та США для потреб ЗСУ, волонтерів і територіальної оборони.' },
      
      { group: 'reviews', slug: 'reviews_h1', text: 'Відгуки клієнтів' },
      { group: 'reviews', slug: 'reviews_p1', text: 'На карті ви можете знайти реальні відгуки наших клієнтів у вашому регіоні. Дізнайтесь, як пройшов їхній досвід замовлення авто з Європи та США, і переконайтеся в якості нашої роботи!' },

      { group: 'calculator', slug: 'calculator_h1', text: 'Калькулятор' },
      { group: 'calculator', slug: 'calculator_p1', text: 'Наш калькулятор допоможе вам швидко розрахувати повну вартість автомобіля, включаючи ціну на аукціоні, доставку, митні платежі та інші витрати.' },

      { group: 'dashboard', slug: 'dashboard_h1', text: 'Рекомендуємо в бюджет' },
      { group: 'dashboard', slug: 'dashboard_p1', text: 'Ми пропонуємо повний комплекс послуг, щоб ви отримали своє авто швидко, вигідно та без зайвих клопотів. MAKS AUTO супроводжує кожен етап – від підбору до повного оформлення в Україні.' },
    ]);
    console.log('Default components added.');

    console.log('Seeding regions...');
    await Region.bulkCreate([
      { name: 'Київська область', область: 'Центральна' },
      { name: 'Черкаська область', область: 'Центральна' },
      { name: 'Кіровоградська область', область: 'Центральна' },
      { name: 'Полтавська область', область: 'Центральна' },
      { name: 'Вінницька область', область: 'Центральна' },
      { name: 'Львівська область', область: 'Західна' },
      { name: 'Івано-Франківська область', область: 'Західна' },
      { name: 'Закарпатська область', область: 'Західна' },
      { name: 'Чернівецька область', область: 'Західна' },
      { name: 'Тернопільська область', область: 'Західна' },
      { name: 'Хмельницька область', область: 'Західна' },
      { name: 'Рівненська область', область: 'Західна' },
      { name: 'Волинська область', область: 'Західна' },
      { name: 'Харківська область', область: 'Східна' },
      { name: 'Донецька область', область: 'Східна' },
      { name: 'Луганська область', область: 'Східна' },
      { name: 'Дніпропетровська область', область: 'Східна' },
      { name: 'Одеська область', область: 'Південна' },
      { name: 'Миколаївська область', область: 'Південна' },
      { name: 'Херсонська область', область: 'Південна' },
      { name: 'Запорізька область', область: 'Південна' },
      { name: 'Автономна Республіка Крим', область: 'Південна' },
      { name: 'Чернігівська область', область: 'Північна' },
      { name: 'Сумська область', область: 'Північна' },
      { name: 'Житомирська область', область: 'Північна' },
    ]);
    console.log('Default regions added.');

    console.log('Seeding body types...');
    await BodyType.bulkCreate([
      { name: 'Кросовер', slug: 'crossover' },
      { name: 'Купе', slug: 'coupe' },
      { name: 'Мінівен', slug: 'minivan' },
      { name: 'Пікап', slug: 'pickup' },
      { name: 'Позашляховик', slug: 'suv' },
      { name: 'Седан', slug: 'sedan' },
      { name: 'Універсал', slug: 'wagon' },
      { name: 'Хетчбек', slug: 'hatchback' }
    ]);
    console.log('Default body types added.');

    console.log('Seeding fuel types...');
    await FuelType.bulkCreate([
      { name: 'Бензин', slug: 'petrol' },
      { name: 'Дизель', slug: 'diesel' },
      { name: 'Електро', slug: 'electric' },
      { name: 'Гібрид', slug: 'hybrid' }
    ]);
    console.log('Default fuel types added.');

    console.log('Seeding reviews...');
    await Review.bulkCreate([
      { 
        name: 'Олександр Петренко', 
        rating: 5, 
        comment: 'Чудовий сервіс! Замовив авто, все пройшло швидко та без проблем. Особливо сподобалась увага до деталей при перевірці автомобіля. Рекомендую!',
        regionId: 1
      },
      { 
        name: 'Марія Коваленко', 
        rating: 5, 
        comment: 'Дуже задоволена співпрацею. Професійний підхід, постійний зв\'язок на всіх етапах. Авто прийшло в ідеальному стані, як і обіцяли.',
        regionId: 6
      },
      { 
        name: 'Володимир Сидоренко', 
        rating: 4, 
        comment: 'Хороший досвід співпраці. Авто знайшли швидко, але були невеликі затримки з документами. В цілому все на високому рівні.',
        regionId: 14
      },
      { 
        name: 'Анна Мельник', 
        rating: 5, 
        comment: 'Вперше замовляла авто з-за кордону і дуже рада, що звернулась саме сюди. Весь процес був прозорим, постійно інформували про статус. Авто перевершило всі очікування!',
        regionId: 19
      },
      { 
        name: 'Ігор Шевченко', 
        rating: 5, 
        comment: 'Професіонали своєї справи! Допомогли підібрати ідеальний варіант за моїм бюджетом. Особливо сподобалась детальна перевірка автомобіля перед покупкою.',
        regionId: 22
      }
    ]);
    console.log('Default reviews added.');

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export default seedDatabase;