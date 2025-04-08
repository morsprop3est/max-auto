import { sequelize, Component, Calculator, Region, Review, Stat } from './models/index.js';

const seedDatabase = async () => {
  try {
    await sequelize.sync();

    // Вимкнення перевірки зовнішніх ключів
    console.log('Disabling foreign key checks...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

    // Очистка таблиць перед додаванням нових даних
    console.log('Clearing tables...');
    await Component.destroy({ where: {}, truncate: true });
    await Calculator.destroy({ where: {}, truncate: true });
    await Review.destroy({ where: {}, truncate: true });
    await Region.destroy({ where: {}, truncate: true });
    await Stat.destroy({ where: {}, truncate: true });
    console.log('Tables cleared.');

    console.log('Enabling foreign key checks...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

    console.log('Seeding components...');
    await Component.bulkCreate([
      { group: 'main', slug: 'main_h1', text: 'MAKS AUTO', photoUrl: '/images/main.jpg' },
      { group: 'main', slug: 'main_h2', text: 'Авто з Європи та США під ключ!', photoUrl: '' },
      { group: 'main', slug: 'main_p1', text: 'Привеземо для вас авто з Європи та США за вигідною ціною! Замовляйте мрію вже сьогодні!', photoUrl: '' },
      { group: 'main', slug: 'main_button', text: 'Хочу замовити!', photoUrl: '' },
      { group: 'about_us', slug: 'about_us_h1', text: 'Про нас', photoUrl: '/images/about_us_1.jpg' },
      { group: 'about_us', slug: 'about_us_p1', text: 'Ми спеціалізуємось на підборі, доставці та оформленні авто з Європи та США.', photoUrl: '' },
      { group: 'stats', slug: 'stat_1', text: 'років досвіду на ринку', photoUrl: '', value: '8+' },
      { group: 'stats', slug: 'stat_2', text: 'задоволених клієнтів', photoUrl: '', value: '1,234' },
      { group: 'stats', slug: 'stat_3', text: 'доставлених автомобілів', photoUrl: '', value: '5 тис' },
      { group: 'stats', slug: 'stat_4', text: 'середній час доставки', photoUrl: '', value: '21 день' },
    ]);
    console.log('Default components added.');

    console.log('Seeding calculator...');
    await Calculator.create({
      formula: 'price * coeff',
      coeffs: { coeff: 1.2 },
    });
    console.log('Default calculator added.');

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

    console.log('Seeding reviews...');
    await Review.bulkCreate([
      { name: 'John Doe', rating: 5, comment: 'Great service!', photo: '/images/review1.jpg', regionId: 1 },
      { name: 'Jane Smith', rating: 4, comment: 'Good experience.', photo: '/images/review2.jpg', regionId: 2 },
    ]);
    console.log('Default reviews added.');

    console.log('Seeding stats...');
    await Stat.bulkCreate([
      { name: 'років досвіду на ринку', value: '8+' },
      { name: 'задоволених клієнтів', value: '1,234' },
      { name: 'доставлених автомобілів', value: '5 тис' },
      { name: 'середній час доставки', value: '21 день' },
    ]);
    console.log('Default stats added.');

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export default seedDatabase;