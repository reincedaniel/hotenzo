'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transfer = sequelize.define('Transfer', {
    internal_code: DataTypes.STRING,
    orderId: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER,
    materialId: DataTypes.INTEGER,
    output_date: DataTypes.DATE,
    operationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    quantity_article: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  Transfer.associate = function(models) {
    Transfer.belongsTo(models.Order)
    Transfer.belongsTo(models.Client)
  };
  return Transfer;
};