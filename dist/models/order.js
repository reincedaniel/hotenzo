'use strict';

module.exports = function (sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    clientId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});

  Order.associate = function (models) {
    Order.belongsTo(models.User);
    Order.belongsTo(models.Client);
    Order.OrderItems = Order.hasMany(models.OrderItem);
    Order.hasMany(models.Transfer);
  };

  return Order;
};