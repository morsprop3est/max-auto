import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('ReviewPhoto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reviewId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Reviews',
        key: 'id',
      },
      allowNull: false,
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'ReviewPhotos',
    timestamps: true,
  });
};