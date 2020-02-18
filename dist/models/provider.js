'use strict';

module.exports = function (sequelize, DataTypes) {
  var Provider = sequelize.define('Provider', {
    internal_code: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone1: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    phone2: DataTypes.STRING,
    obs: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});

  Provider.associate = function (models) {
    Provider.hasMany(models.Input);
  };

  return Provider;
};