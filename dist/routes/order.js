"use strict";

var _verifyToken = _interopRequireDefault(require("../utils/verifyToken"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (app) {
  // List order/service
  app.get('/api/orders', _verifyToken["default"], function (req, res) {
    _models["default"].Order.findAll({
      include: [_models["default"].Client, {
        association: _models["default"].Order.OrderItems,
        include: [_models["default"].OrderItem.Article]
      }]
    }).then(function (orders) {
      res.json({
        orders: orders
      });
    });
  }), // REGISTER Orders
  app.post('/api/orders', _verifyToken["default"], function (req, res) {
    // Params
    // Verify if exist into models.orders
    _models["default"].Order.create(req.body, {
      include: [_models["default"].OrderItem]
    }).then(function (orders) {
      return res.json({
        orders: orders,
        'code': 1
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Cannot add order',
        'code': 0
      });
    });
  }); // UPDATE order

  app.put('/api/orders/:id', _verifyToken["default"], function (req, res) {
    // Params
    var order = req.body; // Verify if exist into models.orders

    _models["default"].Order.findOne({
      attributes: ["id"],
      where: {
        id: req.params.id
      }
    }).then(function (orderFound2) {
      orderFound2.update(order).then(function (orders) {
        return res.json({
          orders: orders,
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Update order',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify order',
        err: err,
        'code': 0
      });
    });
  }); // Delete order

  app["delete"]('/api/orders/:id', _verifyToken["default"], function (req, res) {
    // Params
    var order = {
      id: req.params.id
    }; // Verify if exist into models.orders

    _models["default"].Order.findOne({
      attributes: ["id"],
      where: {
        id: order.id
      }
    }).then(function (orderFound2) {
      orderFound2.destroy(order).then(function () {
        _models["default"].OrderItem.destroy({
          attributes: ["orderId"],
          where: {
            orderId: order.id
          }
        }).then(function () {
          return res.json({
            'status': 'success',
            'code': 1
          });
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Delete order',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify order',
        err: err,
        'code': 0
      });
    });
  });
};