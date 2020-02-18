'use strict';
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    internal_code: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    info: DataTypes.STRING,
    phone1: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    phone2: DataTypes.STRING,
    obs: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Provider.associate = function(models) {
    Provider.hasMany(models.Input)
    Provider.hasMany(models.Article)
  };
  return Provider;
};