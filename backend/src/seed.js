import { sequelize, Component, Calculator, Region, Review, Stat } from './models/index.js';

const seedDatabase = async () => {
  try {
    await sequelize.sync();

    const componentsCount = await Component.count();
    if (componentsCount === 0) {
      await Component.bulkCreate([
        { slug: 'engine', text: 'Engine Component', photoUrl: '/images/engine.jpg' },
        { slug: 'wheels', text: 'Wheels Component', photoUrl: '/images/wheels.jpg' },
        { slug: 'brakes', text: 'Brakes Component', photoUrl: '/images/brakes.jpg' },
        { slug: 'lights', text: 'Lights Component', photoUrl: '/images/lights.jpg' },
        { slug: 'seats', text: 'Seats Component', photoUrl: '/images/seats.jpg' },
        { slug: 'dashboard', text: 'Dashboard Component', photoUrl: '/images/dashboard.jpg' },
        { slug: 'mirrors', text: 'Mirrors Component', photoUrl: '/images/mirrors.jpg' },
        { slug: 'windows', text: 'Windows Component', photoUrl: '/images/windows.jpg' },
      ]);
      console.log('Default components added.');
    }

    const calculatorsCount = await Calculator.count();
    if (calculatorsCount === 0) {
      await Calculator.create({
        formula: 'price * coeff',
        coeffs: { coeff: 1.2 },
      });
      console.log('Default calculator added.');
    }

    const regionsCount = await Region.count();
    if (regionsCount === 0) {
      await Region.bulkCreate([
        { name: 'Kyiv', area: 'Central' },
        { name: 'Lviv', area: 'Western' },
        { name: 'Odessa', area: 'Southern' },
        { name: 'Kharkiv', area: 'Eastern' },
      ]);
      console.log('Default regions added.');
    }

    const reviewsCount = await Review.count();
    if (reviewsCount === 0) {
      await Review.bulkCreate([
        { name: 'John Doe', rating: 5, comment: 'Great service!', photo: '/images/review1.jpg', regionId: 1 },
        { name: 'Jane Smith', rating: 4, comment: 'Good experience.', photo: '/images/review2.jpg', regionId: 2 },
      ]);
      console.log('Default reviews added.');
    }

    const statsCount = await Stat.count();
    if (statsCount === 0) {
      await Stat.bulkCreate([
        { name: 'Total Orders', value: '100' },
        { name: 'Total Revenue', value: '$50000' },
      ]);
      console.log('Default stats added.');
    }

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

// Перевірка, чи файл запускається напряму
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export default seedDatabase;