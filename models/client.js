'use strict';

module.exports = function (sequelize, DataTypes) {
  var Client = sequelize.define('Client', {
    internal_code: DataTypes.STRING,
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    obs: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});

  Client.associate = function (models) {
    Client.hasMany(models.Order);
    Client.hasMany(models.Transfer);
  };

  return Client;
};