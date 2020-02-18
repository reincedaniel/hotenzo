"use strict";

var _verifyToken = _interopRequireDefault(require("../utils/verifyToken"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (app) {
  // List Transfer/service
  app.get('/api/transfers', _verifyToken["default"], function (req, res) {
    _models["default"].Transfer.findAll({
      include: [{
        model: _models["default"].Order
      }, {
        model: _models["default"].Client
      }]
    }).then(function (transfers) {
      res.json({
        transfers: transfers
      });
    });
  }), // REGISTER USER V
  app.post('/api/transfers', _verifyToken["default"], function (req, res) {
    // Params
    var Transfer = req.body; // Verify if exist into models.Transfers

    _models["default"].Transfer.create(Transfer).then(function (transfers) {
      return res.json({
        transfers: transfers,
        'code': 1
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Cannot add Transfer',
        'code': 0
      });
    });
  }); // UPDATE Transfer

  app.put('/api/transfers/:id', _verifyToken["default"], function (req, res) {
    // Params
    var Transfer = req.body; // Verify if exist into models.Transfers

    _models["default"].Transfer.findOne({
      attributes: ["id"],
      where: {
        id: req.params.id
      }
    }).then(function (TransferFound2) {
      TransferFound2.update(Transfer).then(function (transfers) {
        return res.json({
          transfers: transfers,
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Update Transfer',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify Transfer',
        err: err,
        'code': 0
      });
    });
  }); // Delete Transfer

  app["delete"]('/api/transfers/:id', _verifyToken["default"], function (req, res) {
    // Params
    var Transfer = {
      id: req.params.id
    }; // Verify if exist into models.Transfers

    _models["default"].Transfer.findOne({
      attributes: ["id"],
      where: {
        id: Transfer.id
      }
    }).then(function (TransferFound2) {
      TransferFound2.destroy(Transfer).then(function () {
        return res.json({
          'status': 'success',
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Delete Transfer',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify Transfer',
        err: err,
        'code': 0
      });
    });
  });
};