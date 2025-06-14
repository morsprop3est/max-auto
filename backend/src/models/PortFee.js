import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('PortFee', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    portId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Ports', key: 'id' }
    },
    carFee: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },  
    crossoverFee: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },  
    suvFee: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },       
    motoFee: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },      
    hybridFee: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },      
  }, {
    tableName: 'PortFees',
    timestamps: false,
  });
};