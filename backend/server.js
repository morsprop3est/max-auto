import app from './src/app.js';
import { sequelize } from './src/models/index.js';
import { fetchAndSaveLots } from './src/services/auctionService.js';

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized.');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    // await seedDatabase();

    // setInterval(async () => {
    //   console.log('Fetching lots from Copart...');
    //   await fetchAndSaveLots(1); 

    //   console.log('Fetching lots from IAAI...');
    //   await fetchAndSaveLots(2);
    // }, 60 * 1000);
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();