'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    internal_code: DataTypes.STRING,
    orderId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,    
    articleId: DataTypes.INTEGER,
    quantity_item: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  OrderItem.associate = function(models) {
    OrderItem.belongsTo(models.Order)
    OrderItem.belongsTo(models.Category)
    OrderItem.Article= OrderItem.belongsTo(models.Article)
  };
  return OrderItem;
};