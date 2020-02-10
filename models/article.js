'use strict';

module.exports = function (sequelize, DataTypes) {
  var Article = sequelize.define('Article', {
    internal_code: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    inputId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    marca: DataTypes.STRING,
    modelo: DataTypes.STRING,
    color: DataTypes.STRING,
    serial_number: DataTypes.STRING,
    obs: DataTypes.STRING,
    manufactured_by: DataTypes.STRING,
    type_value: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    year_made: DataTypes.INTEGER,
    photo: DataTypes.STRING
  }, {});

  Article.associate = function (models) {
    Article.belongsTo(models.User);
    Article.belongsTo(models.Category);
    Article.hasMany(models.Input);
  };

  return Article;
};