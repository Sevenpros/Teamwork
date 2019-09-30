"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _userHelper = _interopRequireDefault(require("../helpers/userHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable import/prefer-default-export */
var authentication = {
  auth: function auth(req, res, next) {
    var bearerHeader = req.headers.authorization; // console.log('bearer: ' +bearerHeader);

    if (typeof bearerHeader !== 'undefined') {
      var bearer = bearerHeader.split(' ');
      var token = bearer[1];

      try {
        var decoded = _jsonwebtoken["default"].verify(token, process.env.TOKEN_KEY);

        req.payload = decoded;
      } catch (error) {
        res.status(401).json({
          status: 401,
          error: 'imvalid token'
        });
      }

      var email = req.payload.email;

      var user = _userHelper["default"].getUser(email);

      if (!user) {
        res.status(401).json({
          status: 401,
          message: 'Aunthentication failed'
        });
      }

      req.body.authorId = user.id;
      req.body.authorName = "".concat(user.firstName, " ").concat(user.lastName);
      next();
    } else {
      res.status(403).json({
        status: 403,
        message: 'Forbidden'
      });
    }
  }
};
var _default = authentication;
exports["default"] = _default;