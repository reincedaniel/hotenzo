'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Inputs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      internal_code: {
        type: Sequelize.STRING,
        defaultValue: '----'
      },
      providerId: {
        type: Sequelize.INTEGER
      },
      locationId: {
        type: Sequelize.INTEGER
      },
      purchase: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      iva: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      discount: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      total: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      input_date: {
        type: Sequelize.DATE
      },
      articleId: {
        type: Sequelize.INTEGER
      },
      quantity_input: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Inputs');
  }
};