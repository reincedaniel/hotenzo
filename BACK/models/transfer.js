'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transfer = sequelize.define('Transfer', {
    internal_code: DataTypes.STRING,
    orderId: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER,
    output_date: DataTypes.DATE,
    operationId: DataTypes.INTEGER,
    quantity_article: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  Transfer.associate = function(models) {
    // associations can be defined here
  };
  return Transfer;
};