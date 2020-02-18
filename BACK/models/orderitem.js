'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    orderId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER,
    quantity_item: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  OrderItem.associate = function(models) {
    // associations can be defined here
  };
  return OrderItem;
};