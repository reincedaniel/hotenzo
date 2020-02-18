'use strict';
module.exports = (sequelize, DataTypes) => {
  const Input = sequelize.define('Input', {
    internal_code: DataTypes.STRING,
    internal_code_order: DataTypes.STRING,
    providerId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER,
    purchase: DataTypes.DECIMAL,
    iva: DataTypes.DECIMAL,
    discount: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    input_date: DataTypes.DATE,
    articleId: DataTypes.INTEGER,
    quantity_input: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  Input.associate = function(models) {
    Input.belongsTo(models.Provider)
    Input.belongsTo(models.Location)
    Input.belongsTo(models.Article)
    Input.belongsTo(models.Order)
    Input.belongsTo(models.Client)

  };
  return Input;total
};