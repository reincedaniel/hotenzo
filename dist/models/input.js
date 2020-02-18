'use strict';

module.exports = function (sequelize, DataTypes) {
  var Input = sequelize.define('Input', {
    internal_code: DataTypes.STRING,
    providerId: DataTypes.INTEGER,
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

  Input.associate = function (models) {
    Input.belongsTo(models.Provider);
    Input.belongsTo(models.Article);
  };

  return Input;
  total;
};