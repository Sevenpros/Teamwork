"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_chai["default"].use(_chaiHttp["default"]);

var token;
var articleId;
describe('Writing Article', function () {
  it('employee should first signup', function () {
    var validUser = {
      firstName: 'seth',
      lastName: 'Bizimana',
      email: 'eric@gmail.com',
      password: '12345678',
      gender: 'male',
      jobRole: 'software engineer',
      department: 'software development',
      address: 'kigali',
      isAdmin: false
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(validUser).end(function (err, res) {// token = res.body.data.token;
    });
  });
  it('employee login before writing article', function () {
    var validLogin = {
      email: 'eric@gmail.com',
      password: '12345678'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send(validLogin).end(function (err, res) {
      token = res.body.data.access_token;
    });
  });
  it('employee should post with article and valid token', function () {
    var validArticle = {
      title: 'technology',
      article: 'hello world this andela developer challenge'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/articles').set('Authorization', "Bearer ".concat(token)).send(validArticle).end(function (err, res) {
      (0, _chai.expect)(res.status).to.eql(200);
      articleId = res.body.data.articleId;
      (0, _chai.expect)(res.body.message).to.be.a('string');
      (0, _chai.expect)(res.body.message).to.eql('article successfully created'); // expect(res.body.data.title).to.be.a('string');
    });
  });
  it('employee can not post article with invalid token', function () {
    var validArticle = {
      title: 'technology',
      article: 'hello world this andela developer challenge'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/articles').send(validArticle).end(function (err, res) {
      (0, _chai.expect)(res.status).to.eql(403);
    });
  });
});
describe('View Articles', function () {
  it('Employee should see all articles with valid token', function () {
    _chai["default"].request(_app["default"]).get('/api/v1/feeds').set('Authorization', "Bearer ".concat(token)).end(function (err, res) {
      (0, _chai.expect)(res.status).to.eql(200);
      (0, _chai.expect)(res.body.data).to.be.a('array');
      (0, _chai.expect)(res.body.message).to.be.a('string');
      (0, _chai.expect)(res.body.message).to.eql('success');
      (0, _chai.expect)(res.body.data).to.be.a('array'); // expect(res.body.data.comments).to.be.a('array');
    });
  });
  it('Employee should not see  articles without valid token', function () {
    _chai["default"].request(_app["default"]).get('/api/v1/feeds').end(function (err, res) {
      (0, _chai.expect)(res.status).to.eql(403);
    });
  });
});
describe('Edit Article', function () {
  it('employee should be able to edit their articles', function () {
    var toEdit = {
      title: 'artificial intelligence',
      article: 'hello world have you ever been stressfull on extreme point?'
    };

    _chai["default"].request(_app["default"]).patch("/api/v1/articles/".concat(articleId)).send(toEdit).set('Authorization', "Bearer ".concat(token)).end(function (err, res) {
      (0, _chai.expect)(res.status).to.eql(200);
      (0, _chai.expect)(res.body.message).to.be.a('string');
      (0, _chai.expect)(res.body.message).to.eql('article successfully edited');
    });
  });
  it('employee can only edit his/her own artcle', function () {
    var art = {
      title: 'cloud computing'
    };

    _chai["default"].request(_app["default"]).patch('/api/v1/articles/art-e1948e30-e293-11e9-8d3f-efdf56617361').send(art).set('Authorization', "Bearer ".concat(token)).end(function (err, res) {
      (0, _chai.expect)(res.status).to.eql(401);
      (0, _chai.expect)(res.body.message).to.be.a('string');
      (0, _chai.expect)(res.body.message).to.eql('user is not allowed to edit this article');
    });
  });
  it('employee can not edit non existing article', function () {
    var art = {
      title: 'cloud computing'
    };

    _chai["default"].request(_app["default"]).patch('/api/v1/articles/a15').send(art).set('Authorization', "Bearer ".concat(token)).end(function (err, res) {
      (0, _chai.expect)(res.status).to.eql(404);
    });
  });
});
describe('Delete Article', function () {
  it('employees should be able to delete their articles', function () {
    _chai["default"].request(_app["default"])["delete"]("/api/v1/articles/".concat(articleId)).set('Authorization', "Bearer ".concat(token)).end(function (err, res) {
      (0, _chai.expect)(res.status).to.eql(204);
    });
  });
  it('employee can only delete his/her own artcle', function () {
    _chai["default"].request(_app["default"])["delete"]('/api/v1/articles/art-e1948e30-e293-11e9-8d3f-efdf56617361').set('Authorization', "Bearer ".concat(token)).end(function (err, res) {
      (0, _chai.expect)(res.status).to.eql(401);
      (0, _chai.expect)(res.body.message).to.be.a('string');
      (0, _chai.expect)(res.body.message).to.eql('authentication failed');
    });
  });
  it('employee can not delete non existing article', function () {
    _chai["default"].request(_app["default"])["delete"]('/api/v1/articles/a15').set('Authorization', "Bearer ".concat(token)).end(function (err, res) {
      (0, _chai.expect)(res.status).to.eql(404);
    });
  });
});