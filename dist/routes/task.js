"use strict";

var _verifyToken = _interopRequireDefault(require("../utils/verifyToken"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (app) {
  // List Task
  app.get('/api/tasks', _verifyToken["default"], function (req, res) {
    _models["default"].Task.findAll({
      include: [_models["default"].User]
    }).then(function (tasks) {
      res.json({
        tasks: tasks
      });
    });
  }), // REGISTER tasks
  app.post('/api/tasks', _verifyToken["default"], function (req, res) {
    // Params
    // Verify if exist into models.tasks
    _models["default"].Task.create(req.body).then(function (tasks) {
      return res.json({
        tasks: tasks,
        'code': 1
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Cannot add Task',
        'code': 0
      });
    });
  }); // UPDATE Task

  app.put('/api/tasks/:id', _verifyToken["default"], function (req, res) {
    // Params
    var Task = req.body; // Verify if exist into models.tasks

    _models["default"].Task.findOne({
      attributes: ["id"],
      where: {
        id: req.params.id
      }
    }).then(function (TaskFound2) {
      TaskFound2.update(Task).then(function (tasks) {
        return res.json({
          tasks: tasks,
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Update Task',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify Task',
        err: err,
        'code': 0
      });
    });
  }); // Delete Task

  app["delete"]('/api/tasks/:id', _verifyToken["default"], function (req, res) {
    // Params
    var Task = {
      id: req.params.id
    }; // Verify if exist into models.tasks

    _models["default"].Task.findOne({
      attributes: ["id"],
      where: {
        id: Task.id
      }
    }).then(function (TaskFound2) {
      TaskFound2.destroy(Task);
      return res.json({
        'status': 'success',
        'code': 1
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify Task',
        err: err,
        'code': 0
      });
    });
  });
};