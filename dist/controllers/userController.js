"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signin = exports.signup = void 0;

var _userHelper = _interopRequireDefault(require("../helpers/userHelper"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable import/prefer-default-export */
var signup = function signup(req, res) {
  var status;
  var message;
  var data;

  var _helper$validateUser = _userHelper["default"].validateUser(req.body),
      error = _helper$validateUser.error;

  if (error) {
    status = 400;
    message = error.details[0].message.replace(/[/"]/g, '');
    return res.status(status).json({
      status: status,
      message: message
    });
  }

  if (_userHelper["default"].getUser(req.body.email)) {
    status = 401;
    message = 'Email already exist';
  } else {
    _userHelper["default"].addUser(req);

    status = 201;
    message = 'User created successfully';
    data = {
      token: _user["default"][_user["default"].length - 1].token
    };
  }

  return res.status(status).json({
    status: status,
    message: message,
    data: data
  });
};

exports.signup = signup;

var signin = function signin(req, res) {
  var user = _userHelper["default"].getUser(req.body.email);

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: 'User not found'
    });
  }

  if (!_userHelper["default"].matchUser(req.body.password, user.password)) {
    return res.status(401).json({
      status: 401,
      message: 'Invalid login credintials'
    });
  }

  var token = _userHelper["default"].generateUserToken(req.body.email);

  return res.status(200).json({
    status: 200,
    message: 'user is successfully logged in',
    data: {
      access_token: token
    }
  });
};

exports.signin = signin;