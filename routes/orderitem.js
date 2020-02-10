"use strict";

var _verifyToken = _interopRequireDefault(require("../utils/verifyToken"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (app) {
  // List orderitem/service
  app.get('/api/orderitems', _verifyToken["default"], function (req, res) {
    _models["default"].OrderItem.findAll({
      include: [_models["default"].Article]
    }).then(function (orderitems) {
      res.json({
        orderitems: orderitems
      });
    });
  }), // REGISTER USER V
  app.post('/api/orderitems', function (req, res) {
    // Params
    var orderitem = req.body; // Verify if exist into models.orderitems

    _models["default"].OrderItem.create(orderitem).then(function (orderitems) {
      return res.json({
        orderitems: orderitems,
        'code': 1
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Cannot add orderitem',
        'code': 0
      });
    });
  }); // UPDATE orderitem

  app.put('/api/orderitems/:id', function (req, res) {
    // Params
    var orderitem = req.body; // Verify if exist into models.orderitems

    _models["default"].OrderItem.findOne({
      attributes: ["id"],
      where: {
        id: req.params.id
      }
    }).then(function (orderitemFound2) {
      orderitemFound2.update(orderitem).then(function (orderitems) {
        return res.json({
          orderitems: orderitems,
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Update orderitem',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify orderitem',
        err: err,
        'code': 0
      });
    });
  }); // Delete orderitem

  app["delete"]('/api/orderitems/:id', function (req, res) {
    // Params
    var orderitem = {
      id: req.params.id
    }; // Verify if exist into models.orderitems

    _models["default"].OrderItem.findOne({
      attributes: ["id"],
      where: {
        id: orderitem.id
      }
    }).then(function (orderitemFound2) {
      orderitemFound2.destroy(orderitem).then(function () {
        return res.json({
          'status': 'success',
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Delete orderitem',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify orderitem',
        err: err,
        'code': 0
      });
    });
  });
};