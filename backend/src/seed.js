import { sequelize, Component, Calculator, Region, Review } from './models/index.js';

const seedDatabase = async () => {
  try {
    await sequelize.sync();

    console.log('Disabling foreign key checks...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

    console.log('Clearing tables...');
    await Component.destroy({ where: {}, truncate: true });
    await Calculator.destroy({ where: {}, truncate: true });
    await Review.destroy({ where: {}, truncate: true });
    await Region.destroy({ where: {}, truncate: true });
    console.log('Tables cleared.');

    console.log('Enabling foreign key checks...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

    console.log('Seeding components...');
    await Component.bulkCreate([
      { group: 'main', slug: 'main_h1', text: 'MAKS AUTO', photoUrl: '' },
      { group: 'main', slug: 'main_h2', text: 'Авто з Європи та США під ключ!', photoUrl: '' },
      { group: 'main', slug: 'main_p1', text: 'Привеземо для вас авто з Європи та США за вигідною ціною! Замовляйте мрію вже сьогодні!', photoUrl: '' },
      { group: 'main', slug: 'main_button', text: 'Хочу замовити!', photoUrl: '' },

      { group: 'about_us', slug: 'about_us_h1', text: 'Про нас', photoUrl: '' },
      { group: 'about_us', slug: 'about_us_p1', text: 'Ми спеціалізуємось на підборі, доставці та оформленні авто з Європи та США. Працюємо чесно, швидко та без зайвих клопотів для вас. Перевіряємо кожен автомобіль перед покупкою, щоб ви отримали тільки найкращі варіанти.', photoUrl: '' },
      { group: 'about_us', slug: 'about_us_stat_1', text: 'Великий вибір авто під замовлення', photoUrl: '' },
      { group: 'about_us', slug: 'about_us_stat_2', text: 'Прозорість на всіх етапах угоди', photoUrl: '' },
      { group: 'about_us', slug: 'about_us_stat_3', text: 'Офіційне оформлення та страхування', photoUrl: '' },
      { group: 'about_us', slug: 'about_us_stat_4', text: 'Доставка у будь-який регіон України', photoUrl: '' },
      { group: 'about_us', slug: 'about_us_image1', text: null, photoUrl: 'https://ntslogistics.com/wp-content/uploads/2020/07/60142-1-1.jpeg' },
      { group: 'about_us', slug: 'about_us_image2', text: null, photoUrl: 'https://ntslogistics.com/wp-content/uploads/2020/07/60142-1-1.jpeg' },

      { group: 'service', slug: 'service_h1_1', text: 'Підбір авто', photoUrl: 'https://ntslogistics.com/wp-content/uploads/2020/07/60142-1-1.jpeg' },
      { group: 'service', slug: 'service_h1_2', text: 'Доставка авто', photoUrl: 'https://ntslogistics.com/wp-content/uploads/2020/07/60142-1-1.jpeg' },
      { group: 'service', slug: 'service_h1_3', text: 'Розмитнення та сертифікація', photoUrl: 'https://ntslogistics.com/wp-content/uploads/2020/07/60142-1-1.jpeg' },
      { group: 'service', slug: 'service_p1_1', text: 'Знайдемо авто з Європи чи США відповідно до вашого бюджету та побажань. Тільки перевірені варіанти з офіційною історією.', photoUrl: null },
      { group: 'service', slug: 'service_p1_2', text: 'Знайдемо авто з Європи чи США відповідно до вашого бюджету та побажань. Тільки перевірені варіанти з офіційною історією.', photoUrl: null },
      { group: 'service', slug: 'service_p1_3', text: 'Знайдемо авто з Європи чи США відповідно до вашого бюджету та побажань. Тільки перевірені варіанти з офіційною історією.', photoUrl: null },
      { group: 'service', slug: 'service_h1', text: 'Наші послуги', photoUrl: null },
      { group: 'service', slug: 'service_p1', text: 'Ми пропонуємо повний комплекс послуг, щоб ви отримали своє авто швидко, вигідно та без зайвих клопотів. MAKS AUTO супроводжує кожен етап – від підбору до повного оформлення в Україні.', photoUrl: null },

      { group: 'stats', slug: 'stat_h1_1', text: '8+', photoUrl: '', },
      { group: 'stats', slug: 'stat_p1_1', text: 'років досвіду на ринку', photoUrl: '', },
      { group: 'stats', slug: 'stat_h1_2', text: '1,234', photoUrl: '', },
      { group: 'stats', slug: 'stat_p1_2', text: 'задоволених клієнтів', photoUrl: '',},
      { group: 'stats', slug: 'stat_p1_3', text: '5 тис', photoUrl: '',},
      { group: 'stats', slug: 'stat_h1_3', text: 'доставлених автомобілів', photoUrl: '', },
      { group: 'stats', slug: 'stat_h1_4', text: '21 день', photoUrl: '', },
      { group: 'stats', slug: 'stat_p1_4', text: 'середній час доставки', photoUrl: '', },
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
      { name: 'John Doe', rating: 5, comment: 'Great service!', photo: '/images/review1.jpg' },
      { name: 'Jane Smith', rating: 4, comment: 'Good experience.', photo: '/images/review2.jpg' },
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