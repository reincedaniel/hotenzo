'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.Article)
/*     Category.Articles= Order.hasMany(models.Article) */
  };
  return Category;
};