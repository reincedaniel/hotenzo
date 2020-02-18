"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var JWT_SIGN_SECRET = '8ogu4o8g0gg8043gg8g8ulg4go834uug4o303407743g7344380g01';
module.exports = {
  generateTokenForUser: function generateTokenForUser(userData) {
    return _jsonwebtoken["default"].sign({
      userId: userData.id
    }, JWT_SIGN_SECRET, {
      expiresIn: '5d'
    });
  },
  parseAuthorization: function parseAuthorization(authorization) {
    return authorization != null ? authorization.replace('Bearer ', '') : null;
  },
  getUserId: function getUserId(authorization) {
    var userId = -1;
    var token = module.exports.parseAuthorization(authorization);

    if (token != null) {
      try {
        var jwtToken = _jsonwebtoken["default"].verify(token, JWT_SIGN_SECRET);

        if (jwtToken != null) userId = jwtToken.userId;
      } catch (err) {}
    }

    return userId;
  },
  destroyToken: function destroyToken(authorization) {
    var token = module.exports.parseAuthorization(authorization);
    return _jsonwebtoken["default"].destroy(token);
  }
};