'use strict';

module.exports = function (sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});

  Category.associate = function (models) {
    Category.hasMany(models.Article);
  };

  return Category;
};