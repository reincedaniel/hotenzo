'use strict';
module.exports = (sequelize, DataTypes) => {
  const Operation = sequelize.define('Operation', {
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    internal_code: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    obs: DataTypes.STRING,
  }, {});
  Operation.associate = function(models) {
    // associations can be defined here
  };
  return Operation;
};