import app from './src/app.js';
import { sequelize } from './src/models/index.js';

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized.');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();