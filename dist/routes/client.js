"use strict";

var _verifyToken = _interopRequireDefault(require("../utils/verifyToken"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (app) {
  // List client/service
  app.get('/api/clients', _verifyToken["default"], function (req, res) {
    _models["default"].Client.findAll({
      include: [_models["default"].Order]
    }).then(function (clients) {
      res.json({
        clients: clients
      });
    });
  }), // REGISTER USER V
  app.post('/api/clients', _verifyToken["default"], function (req, res) {
    // Params
    var client = req.body; // Verify if exist into models.clients
    // Verify if exist into models.categories

    _models["default"].Client.findOne({
      attributes: ["name"],
      where: {
        name: client.name
      }
    }).then(function (clientFound) {
      if (!clientFound) {
        _models["default"].Client.create(client).then(function (clients) {
          return clients.update({
            internal_code: 'CLI' + clients.id
          }).then(function (d) {
            return res.json({
              clients: clients,
              'code': 1
            });
          })["catch"](function (err) {
            return res.json({
              'error': 'Cannot add clients, error internal code',
              'code': 0
            });
          });
        })["catch"](function (err) {
          return res.json({
            'error': 'Cannot add Client',
            'code': 0
          });
        });
      } else {
        return res.json({
          'error': 'Client already exist',
          'code': 11
        });
      }
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify Client',
        err: err,
        'code': 0
      });
    });
  }); // UPDATE client

  app.put('/api/clients/:id', _verifyToken["default"], function (req, res) {
    // Params
    var client = req.body; // Verify if exist into models.clients

    _models["default"].Client.findOne({
      attributes: ["id"],
      where: {
        id: req.params.id
      }
    }).then(function (clientFound2) {
      clientFound2.update(client).then(function (clients) {
        return res.json({
          clients: clients,
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Update client',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify client',
        err: err,
        'code': 0
      });
    });
  }); // Delete client

  app["delete"]('/api/clients/:id', _verifyToken["default"], function (req, res) {
    // Params
    var client = {
      id: req.params.id
    }; // Verify if exist into models.clients

    _models["default"].Client.findOne({
      attributes: ["id"],
      where: {
        id: client.id
      }
    }).then(function (clientFound2) {
      clientFound2.destroy(client).then(function () {
        return res.json({
          'status': 'success',
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Delete client',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify client',
        err: err,
        'code': 0
      });
    });
  });
};