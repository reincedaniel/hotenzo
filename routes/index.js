"use strict";

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (app) {
  app.get('/api', function (req, res) {
    _models["default"].User.findByPk(1).then(function (users) {
      res.json({
        users: users
      });
    });
  });
};
/**
 * 
 * "development": {
    "username": "root",
    "password": "1212",
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
 */