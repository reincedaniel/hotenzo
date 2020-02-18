"use strict";

var _verifyToken = _interopRequireDefault(require("../utils/verifyToken"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (app) {
  // List provider/service
  app.get('/api/providers', _verifyToken["default"], function (req, res) {
    _models["default"].Provider.findAll().then(function (providers) {
      res.json({
        providers: providers
      });
    });
  }), // REGISTER provider
  app.post('/api/providers', _verifyToken["default"], function (req, res) {
    // Params
    var provider = req.body; // Verify if exist into models.providers

    _models["default"].Provider.findOne({
      attributes: ["name"],
      where: {
        name: provider.name
      }
    }).then(function (providerFound) {
      if (!providerFound) {
        _models["default"].Provider.create(provider).then(function (providers) {
          return providers.update({
            internal_code: 'FRNC' + providers.id
          }).then(function (g) {
            return res.json({
              providers: providers,
              'code': 1
            });
          })["catch"](function (err) {
            return res.json({
              'error': 'Internal Code',
              'code': 0
            });
          });
        })["catch"](function (err) {
          return res.json({
            'error': 'Cannot add provider',
            'code': 0
          });
        });
      } else {
        return res.json({
          'error': 'provider already exist',
          'code': 11
        });
      }
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify provider',
        err: err,
        'code': 0
      });
    });
  }); // UPDATE provider

  app.put('/api/providers/:id', _verifyToken["default"], function (req, res) {
    // Params
    var provider = req.body; // Verify if exist into models.providers

    _models["default"].Provider.findOne({
      attributes: ["id"],
      where: {
        id: req.params.id
      }
    }).then(function (providerFound2) {
      providerFound2.update(provider).then(function (providers) {
        return res.json({
          providers: providers,
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Update provider',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify provider',
        err: err,
        'code': 0
      });
    });
  }); // Delete provider

  app["delete"]('/api/providers/:id', _verifyToken["default"], function (req, res) {
    // Params
    var provider = {
      id: req.params.id
    }; // Verify if exist into models.providers

    _models["default"].Provider.findOne({
      attributes: ["id"],
      where: {
        id: provider.id
      }
    }).then(function (providerFound2) {
      providerFound2.destroy(provider).then(function () {
        return res.json({
          'status': 'success',
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Delete provider',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify provider',
        err: err,
        'code': 0
      });
    });
  });
};