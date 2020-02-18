'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    internal_code: DataTypes.STRING,
    internal_code_order: DataTypes.STRING,
    clientId: DataTypes.INTEGER,
    quantity_input: DataTypes.INTEGER,
    operationId: DataTypes.INTEGER,
    materialId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.User)
    Order.belongsTo(models.Operation)
    Order.belongsTo(models.Material)
    Order.belongsTo(models.Client)
    Order.OrderItems= Order.hasMany(models.OrderItem)
    Order.hasMany(models.Transfer)
    Order.hasMany(models.Input)
  };
  return Order;
};