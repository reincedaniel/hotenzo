'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    description: DataTypes.STRING,
    corredor: DataTypes.STRING,
    pratileira: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
  };
  return Location;
};