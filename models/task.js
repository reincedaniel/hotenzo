'use strict';

module.exports = function (sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    userId: DataTypes.INTEGER,
    adminId: DataTypes.INTEGER,
    dateFinish: DataTypes.DATE,
    dateStart: DataTypes.DATE,
    description: DataTypes.STRING,
    state: DataTypes.BOOLEAN
  }, {});

  Task.associate = function (models) {
    Task.belongsTo(models.User);
  };

  return Task;
};