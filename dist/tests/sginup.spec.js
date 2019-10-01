"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_chai["default"].use(_chaiHttp["default"]);

describe('SIGN UP', function () {
  it('employee should be able to signup with valid info', function () {
    var validUser = {
      firstName: 'seth',
      lastName: 'Bizimana',
      email: 'seth@gmail.com',
      password: '12345678',
      gender: 'male',
      jobRole: 'software engineer',
      department: 'software development',
      address: 'kigali',
      isAdmin: false
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(validUser).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equals(201);
      (0, _chai.expect)(res.body.message).to.be.a('string');
      (0, _chai.expect)(res.body.data.token).to.be.a('string');
    });
  });
  it('employee should not signup twice', function () {
    var validUser = {
      firstName: 'seth',
      lastName: 'Bizimana',
      email: 'seth@gmail.com',
      password: '12345678',
      gender: 'male',
      jobRole: 'software engineer',
      department: 'software development',
      address: 'kigali',
      isAdmin: false
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(validUser).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equals(401);
      (0, _chai.expect)(res.body.message).to.be.a('string');
    });
  });
  it('should not signup with uncompleted info ', function () {
    var invalidData = {
      firstName: 'seth'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(invalidData).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equals(400);
      (0, _chai.expect)(res.body.message).to.be.a('string');
    });
  });
});
describe('LOGIN', function () {
  it('should login with valid credentials', function () {
    var validLogin = {
      email: 'seth@gmail.com',
      password: '12345678'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send(validLogin).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equals(200);
      (0, _chai.expect)(res.body.message).to.be.a('string');
    });
  });
  it('should login with non existing email address', function () {
    var invalidLogin = {
      email: 'hello world',
      password: 'hello'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send(invalidLogin).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equals(404);
      (0, _chai.expect)(res.body.message).to.be.a('string');
    });
  });
  it('should not login with wrong password', function () {
    var wrongPassword = {
      email: 'seth@gmail.com',
      password: 'hello'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send(wrongPassword).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equals(401);
      (0, _chai.expect)(res.body.message).to.be.a('string');
    });
  });
});