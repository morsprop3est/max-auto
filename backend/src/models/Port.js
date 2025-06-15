import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Port', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'Ports',
    timestamps: false,
    hooks: {
      beforeDestroy: async (port) => {
        await sequelize.models.PortFee.destroy({
          where: { portId: port.id }
        });
        await sequelize.models.AuctionLocationPort.destroy({
          where: { portId: port.id }
        });
        await sequelize.models.AuctionLocation.update(
          { portId: null },
          { where: { portId: port.id } }
        );
      }
    }
  });
};