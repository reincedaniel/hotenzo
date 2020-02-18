'use strict';
module.exports = (sequelize, DataTypes) => {
  const Operation = sequelize.define('Operation', {
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Operation.associate = function(models) {
    // associations can be defined here
  };
  return Operation;
};