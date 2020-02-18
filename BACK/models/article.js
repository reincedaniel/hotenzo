'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    internal_code: DataTypes.STRING,
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
  Article.associate = function(models) {
    // associations can be defined here
  };
  return Article;
};