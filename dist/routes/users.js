"use strict";

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jwt = _interopRequireDefault(require("../utils/jwt.util"));

var _models = _interopRequireDefault(require("../models"));

var _verifyToken = _interopRequireDefault(require("../utils/verifyToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (app) {
  app.get('/api/token_life', function (req, res) {
    var headerAuth = req.headers['authorization'];

    var userId = _jwt["default"].getUserId(headerAuth);

    if (userId < 0) return res.json({
      'error': 'Wrong Token',
      'code': 200,
      'access': false
    });else return res.json({
      'code': 1,
      'access': true
    });
  }), // List USER V
  app.get('/api/users', _verifyToken["default"], function (req, res) {
    _models["default"].User.findAll({
      include: [_models["default"].Order]
    }).then(function (users) {
      res.json({
        users: users
      });
    });
  }), // REGISTER USER V
  app.post('/api/users', _verifyToken["default"], function (req, res) {
    // Params
    var User = req.body;
    User.password = '123456';
    if (User.email == null || User.username == null || User.password == null) return res.json({
      'error': 'Missing parameters',
      'code': 10
    }); // Verify if exist into models.users

    _models["default"].User.findOne({
      attributes: ["username"],
      where: {
        username: User.username
      }
    }).then(function (userFound) {
      if (!userFound) {
        _bcrypt["default"].hash(User.password, 5, function (err, bcryptedPassword) {
          var newUser = _models["default"].User.create({
            email: User.email,
            username: User.username,
            status: User.status,
            password: bcryptedPassword,
            level: User.level,
            name: User.name
          }).then(function (users) {
            users.update({
              internal_code: 'USR' + users.id
            }).then(function (d) {
              return res.json({
                users: users,
                'code': 1
              });
            })["catch"](function (err) {
              return res.json({
                'Error': 'Problem Internal code',
                'code': 0
              });
            });
          })["catch"](function (err) {
            return res.json({
              'error': 'Cannot add user',
              'code': 0
            });
          });
        });
      } else {
        return res.json({
          'error': 'User already exist',
          'code': 11
        });
      }
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify user',
        err: err,
        'code': 0
      });
    });
  }), // Delete user
  app["delete"]('/api/users/:id', _verifyToken["default"], function (req, res) {
    // Params
    var user = {
      id: req.params.id
    }; // Verify if exist into models.user

    _models["default"].User.findOne({
      attributes: ["id"],
      where: {
        id: user.id
      }
    }).then(function (userFound2) {
      userFound2.destroy(user).then(function () {
        return res.json({
          'status': 'success',
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Delete user',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify user',
        err: err,
        'code': 0
      });
    });
  }), // UPDATE USER V
  app.put('/api/users/:id', _verifyToken["default"], function (req, res) {
    // Params
    var User = req.body; // Verify if exist into models.users

    _models["default"].User.findOne({
      attributes: ["id"],
      where: {
        id: req.params.id
      }
    }).then(function (userFound2) {
      var newUser = userFound2.update(User).then(function (users) {
        return res.json({
          users: users,
          'code': 1
        });
      })["catch"](function (err) {
        return res.json({
          'error': 'Cannot Update user',
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify user',
        err: err,
        'code': 0
      });
    });
  }), // LOGIN V
  app.post('/api/login', function (req, res) {
    var User = {
      username: req.body.username,
      password: req.body.password
    };

    if (User.username == null || User.password == null) {
      return res.json({
        'error': 'missing parameters',
        'code': 10
      });
    } // Verify


    _models["default"].User.findOne({
      where: {
        username: User.username
      }
    }).then(function (userFound) {
      if (userFound) {
        _bcrypt["default"].compare(User.password, userFound.password, function (errBycrypt, resBycrypt) {
          if (resBycrypt) {
            if (userFound.status == true) {
              return res.json({
                'users': userFound,
                'token': _jwt["default"].generateTokenForUser(userFound),
                'code': 12
              });
            } else {
              return res.json({
                'error': 'User Inactive',
                'code': 1111
              });
            }
          } else {
            return res.json({
              'error': 'Invalid password',
              'code': 111
            });
          }
        });
      } else {
        return res.json({
          'error': 'User does not exist',
          'code': 110
        });
      }
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify user',
        err: err,
        'code': 0
      });
    });
  }), // Get user profile V
  app.get('/api/users/profile/:id', _verifyToken["default"], function (req, res) {
    _models["default"].User.findOne({
      include: [_models["default"].Order],
      where: {
        id: req.params.id
      }
    }).then(function (users) {
      if (users) {
        return res.json({
          users: users,
          'code': 1
        });
      } else {
        return res.json({
          'error': 'User does not exist',
          'code': 110
        });
      }
    })["catch"](function (err) {
      return res.json({
        'error': 'Cannot fetch user',
        'code': 0
      });
    });
  }), // Update password User V
  app.put('/api/users/profile/:id', _verifyToken["default"], function (req, res) {
    var passwordOld = req.body.passwordOld;
    var passwordNew = req.body.passwordNew;

    _models["default"].User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (U) {
      _bcrypt["default"].compare(passwordOld, U.password, function (errBycrypt, resBycrypt) {
        if (resBycrypt) {
          _bcrypt["default"].hash(passwordNew, 5, function (err, bcryptedPassword) {
            var newUser = U.update({
              password: bcryptedPassword
            }).then(function (users) {
              return res.json({
                users: users,
                'code': 1
              });
            })["catch"](function (err) {
              return res.json({
                'error': 'Cannot add user',
                'code': 0
              });
            });
          });
        } else {
          return res.json({
            'error': 'Old password invalid',
            'code': 111
          });
        }
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify user',
        err: err,
        'code': 0
      });
    });
  }); // Update password UserADMIN

  app.put('/api/users', _verifyToken["default"], function (req, res) {
    var userId = req.body.idUserAdmin;
    var idUserNormal = req.body.idUserNormal;
    var passwordNew = '936785605';

    _models["default"].User.findOne({
      where: {
        id: userId
      }
    }).then(function (UX) {
      _models["default"].User.findOne({
        where: {
          id: idUserNormal
        }
      }).then(function (U) {
        if (UX.level == 1) {
          _bcrypt["default"].hash(passwordNew, 5, function (err, bcryptedPassword) {
            U.update({
              password: bcryptedPassword
            }).then(function (users) {
              return res.json({
                users: users,
                'code': 1
              });
            })["catch"](function (err) {
              return res.json({
                'error': 'Cannot Update password user',
                'code': 0
              });
            });
          });
        } else {
          return res.json({
            'error': 'Only admin',
            err: err,
            'code': 333
          });
        }
      })["catch"](function (err) {
        return res.json({
          'error': 'Unable to verify user Person',
          err: err,
          'code': 0
        });
      });
    })["catch"](function (err) {
      return res.json({
        'error': 'Unable to verify user x!!',
        err: err,
        'code': 0
      });
    });
  });
};