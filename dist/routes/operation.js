"use strict";

var _verifyToken = _interopRequireDefault(require("../utils/verifyToken"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (app) {
  // List Operation/service
  app.get('/api/operations', _verifyToken["default"], function (req, res) {
    _models["default"].Operation.findAll().then(function (operations) {
      res.json({
        operations: operations
      });
    });
  }), // REGISTER V
  app.post('/api/operations', _verifyToken["default"], function (req, res) {
    // Params
    var Operation = req.body; // Verify if exist into models.operations

    _models["default"].Operation.findOne({
      attributes: ["name"],
      where: {
        name: Operation.name
      }
    }).then(function (OperationFound) {
      if (!OperationFound) {
        _models["default"].Operation.create(Operation).then(function (operations) {
          operations.update({
            internal_code: 'OPE' + operations.id
          }).then(function (f) {
            return res.json({
              operations: operations,
              'code': 1
            });
          })["catch"](function (err) {
            return res.json({
              'error': 'Cannot add Operation',
              'code': 0
            });
          });
        })["catch"](function (err) {
          return res.json({
            'error': 'Cannot add Operation',
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
        'error': 'Unable to verify Operation',
        err: err,
        'code': 0
      });
    });
  }); // UPDATE Operation

  app.put('/api/operations/:id', _verifyToken["default"], function (req, res) {
    // Params
    var Operation = req.body; // Verify if exist into models.operations

    _models["default"].Operation.findOne({
      attributes: ["id"],
      where: {
        id: req.params.id
      }
    }).then(function (OperationFound2) {
      OperationFound2.update(Operation).then(function (operations) {
        return res.json({
          operations: operations,
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Update Operation',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify Operation',
        err: err,
        'code': 0
      });
    });
  }); // Delete Operation

  app["delete"]('/api/operations/:id', _verifyToken["default"], function (req, res) {
    // Params
    var Operation = {
      id: req.params.id
    }; // Verify if exist into models.operations

    _models["default"].Operation.findOne({
      attributes: ["id"],
      where: {
        id: Operation.id
      }
    }).then(function (OperationFound2) {
      OperationFound2.destroy(Operation).then(function () {
        return res.json({
          'status': 'success',
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Delete Operation',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify Operation',
        err: err,
        'code': 0
      });
    });
  });
};