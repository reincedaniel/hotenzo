"use strict";

var _verifyToken = _interopRequireDefault(require("../utils/verifyToken"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (app) {
  // List Location/service
  app.get('/api/locations', _verifyToken["default"], function (req, res) {
    _models["default"].Location.findAll().then(function (locations) {
      res.json({
        locations: locations
      });
    });
  }), // REGISTER V
  app.post('/api/locations', _verifyToken["default"], function (req, res) {
    // Params
    var Location = req.body; // Verify if exist into models.locations

    _models["default"].Location.findOne({
      attributes: ["description"],
      where: {
        description: Location.description
      }
    }).then(function (LocationFound) {
      if (!LocationFound) {
        _models["default"].Location.create(Location).then(function (locations) {
          return res.json({
            locations: locations,
            'code': 1
          });
        })["catch"](function (err) {
          return res.json({
            'error': 'Cannot add Location',
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
        'error': 'Unable to verify Location',
        err: err,
        'code': 0
      });
    });
  }); // UPDATE Location

  app.put('/api/locations/:id', _verifyToken["default"], function (req, res) {
    // Params
    var Location = req.body; // Verify if exist into models.locations

    _models["default"].Location.findOne({
      attributes: ["id"],
      where: {
        id: req.params.id
      }
    }).then(function (LocationFound2) {
      LocationFound2.update(Location).then(function (locations) {
        return res.json({
          locations: locations,
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Update Location',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify Location',
        err: err,
        'code': 0
      });
    });
  }); // Delete Location

  app["delete"]('/api/locations/:id', _verifyToken["default"], function (req, res) {
    // Params
    var Location = {
      id: req.params.id
    }; // Verify if exist into models.locations

    _models["default"].Location.findOne({
      attributes: ["id"],
      where: {
        id: Location.id
      }
    }).then(function (LocationFound2) {
      LocationFound2.destroy(Location).then(function () {
        return res.json({
          'status': 'success',
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Delete Location',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify Location',
        err: err,
        'code': 0
      });
    });
  });
};