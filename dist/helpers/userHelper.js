"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = require("dotenv");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _uuidv = _interopRequireDefault(require("uuidv1"));

var _user = _interopRequireDefault(require("../models/user"));

var _article = _interopRequireDefault(require("../models/article"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable import/prefer-default-export */
(0, _dotenv.config)();
var helper = {
  getUser: function getUser(email) {
    var user = _user["default"].find(function (u) {
      return u.email === email;
    });

    return user;
  },
  generateUserToken: function generateUserToken(email) {
    var token = _jsonwebtoken["default"].sign({
      email: email
    }, process.env.TOKEN_KEY);

    return token;
  },
  matchUser: function matchUser(plain, hash) {
    return _bcrypt["default"].compareSync(plain, hash);
  },
  addUser: function addUser(req) {
    var newUser = {
      id: "emp-".concat((0, _uuidv["default"])()),
      token: this.generateUserToken(req.body.email),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: this.securePassword(req.body.password),
      gender: req.body.gender,
      jobRole: req.body.jobRole,
      department: req.body.department,
      address: req.body.address,
      isAdmin: false
    };

    _user["default"].push(newUser);
  },
  validateUser: function validateUser(user) {
    var schema = {
      firstName: _joi["default"].string().min(3).required(),
      lastName: _joi["default"].string().min(3).required(),
      email: _joi["default"].string().email({
        minDomainAtoms: 2
      }),
      password: _joi["default"].string().regex(/^[a-zA-Z0-9]{3,30}$/),
      gender: _joi["default"].string().required(),
      jobRole: _joi["default"].string().min(3).required(),
      department: _joi["default"].string().required(),
      address: _joi["default"].string().required(),
      isAdmin: _joi["default"]["boolean"]().required()
    };
    return _joi["default"].validate(user, schema);
  },
  validateArticle: function validateArticle(article) {
    var schema = {
      authorId: _joi["default"].string().required(),
      authorName: _joi["default"].string().required(),
      title: _joi["default"].string().min(3).required(),
      article: _joi["default"].string().min(10).required()
    };
    return _joi["default"].validate(article, schema);
  },
  findArticle: function findArticle(id) {
    if (!id) {// return;
    }

    var article = _article["default"].find(function (art) {
      return art.articleId === id;
    });

    return article;
  },
  checkAuthor: function checkAuthor(req) {
    if (!req.payload) {// return;
    }

    var author = this.getUser(req.payload.email);
    var article = this.findArticle(req.params.id);
    return author.id === article.authorId;
  },
  securePassword: function securePassword(password) {
    if (!password) {// return;
    }

    var hashPasswod = _bcrypt["default"].hashSync(password, 10);

    return hashPasswod;
  }
};
var _default = helper;
exports["default"] = _default;