'use strict';
module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define('Material', {
    internal_code: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    inputId: DataTypes.INTEGER,
    iva: DataTypes.DECIMAL,
    purchase: DataTypes.DECIMAL,
    discount: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    status: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    marca: DataTypes.STRING,
    modelo: DataTypes.STRING,
    color: DataTypes.STRING,
    serial_number: DataTypes.STRING,
    obs: DataTypes.STRING,
    manufactured_by: DataTypes.STRING,
    type_value: DataTypes.STRING,
    info: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    year_made: DataTypes.INTEGER,
    photo: DataTypes.STRING
  }, {});
  Material.associate = function(models) {
    Material.belongsTo(models.User)
    Material.hasMany(models.Order)
  };
  return Material;
};