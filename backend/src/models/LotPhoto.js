import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('LotPhoto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lotId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Lots',
        key: 'id',
      },
      allowNull: false,
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'LotPhotos',
    timestamps: true,
  });
};