import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Component', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    slug: { 
      type: DataTypes.STRING,
    },
    group: { 
      type: DataTypes.STRING,
    },
    text: { 
      type: DataTypes.STRING,
    },
    photoUrl: { 
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'Components',
    timestamps: true,
  });
};