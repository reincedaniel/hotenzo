'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    internal_code: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    providerId: DataTypes.INTEGER,    
    inputId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    iva: DataTypes.DECIMAL,
    purchase: DataTypes.DECIMAL,
    discount: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    status: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    info: DataTypes.STRING,
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
    Article.belongsTo(models.User)
    Article.belongsTo(models.Category)
    Article.hasMany(models.Input)
    Article.belongsTo(models.Provider)

  };
  return Article;
};