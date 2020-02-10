'use strict';

module.exports = function (sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    description: DataTypes.STRING,
    corredor: DataTypes.STRING,
    pratileira: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    obs: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});

  Location.associate = function (models) {
    Location.hasMany(models.Input);
  };

  return Location;
};