'use strict';
module.exports = (sequelize, DataTypes) => {
  const Input = sequelize.define('Input', {
    internal_code: DataTypes.STRING,
    providerId: DataTypes.INTEGER,
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
    // associations can be defined here
  };
  return Input;
};