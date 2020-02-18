'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    internal_code: DataTypes.STRING,
    level: DataTypes.INTEGER,
    email: DataTypes.STRING,
    obs: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Order)
    User.hasMany(models.Article)
    User.hasMany(models.Material)
    User.hasMany(models.Task)
  };
  return User;
};