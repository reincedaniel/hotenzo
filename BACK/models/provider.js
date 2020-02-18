'use strict';
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone1: DataTypes.STRING,
    phone2: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Provider.associate = function(models) {
    // associations can be defined here
  };
  return Provider;
};