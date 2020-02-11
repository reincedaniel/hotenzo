'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    internal_code: DataTypes.STRING,
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    obs: DataTypes.STRING,
    status: DataTypes.BOOLEAN
    
  }, {});
  Client.associate = function(models) {
    Client.hasMany(models.Order)
    Client.hasMany(models.Transfer)
  };
  return Client;
};