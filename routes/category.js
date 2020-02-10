"use strict";

var _verifyToken = _interopRequireDefault(require("../utils/verifyToken"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (app) {
  // List category/service
  app.get('/api/categories', _verifyToken["default"], function (req, res) {
    _models["default"].Category.findAll().then(function (categories) {
      res.json({
        categories: categories
      });
    });
  }), // REGISTER USER V
  app.post('/api/categories', _verifyToken["default"], function (req, res) {
    // Params
    var category = req.body; // Verify if exist into models.categories

    _models["default"].Category.findOne({
      attributes: ["name"],
      where: {
        name: category.name
      }
    }).then(function (categoryFound) {
      if (!categoryFound) {
        _models["default"].Category.create(category).then(function (categories) {
          return res.json({
            categories: categories,
            'code': 1
          });
        })["catch"](function (err) {
          return res.json({
            'error': 'Cannot add category',
            'code': 0
          });
        });
      } else {
        return res.json({
          'error': 'product already exist',
          'code': 11
        });
      }
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify category',
        err: err,
        'code': 0
      });
    });
  }); // UPDATE category

  app.put('/api/categories/:id', _verifyToken["default"], function (req, res) {
    // Params
    var category = req.body; // Verify if exist into models.categories

    _models["default"].Category.findOne({
      attributes: ["id"],
      where: {
        id: req.params.id
      }
    }).then(function (categoryFound2) {
      categoryFound2.update(category).then(function (categories) {
        return res.json({
          categories: categories,
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Update category',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify category',
        err: err,
        'code': 0
      });
    });
  }); // Delete category

  app["delete"]('/api/categories/:id', _verifyToken["default"], function (req, res) {
    // Params
    var category = {
      id: req.params.id
    }; // Verify if exist into models.categories

    _models["default"].Category.findOne({
      attributes: ["id"],
      where: {
        id: category.id
      }
    }).then(function (categoryFound2) {
      categoryFound2.destroy(category).then(function () {
        return res.json({
          'status': 'success',
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Delete category',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify category',
        err: err,
        'code': 0
      });
    });
  });
};