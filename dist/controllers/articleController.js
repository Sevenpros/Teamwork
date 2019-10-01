"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _article = _interopRequireDefault(require("../models/article"));

var _articleHelper = _interopRequireDefault(require("../helpers/articleHelper"));

var _userHelper = _interopRequireDefault(require("../helpers/userHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var articleController = {
  shareArticles: function shareArticles(req, res) {
    var _helper$validateArtic = _userHelper["default"].validateArticle(req.body),
        error = _helper$validateArtic.error;

    if (error) {
      res.status(400).json({
        status: 400,
        messge: error.details[0].message.replace(/[/"]/g, '')
      });
    } // eslint-disable-next-line max-len


    var article = new _articleHelper["default"](req.body.authorId, req.body.authorName, req.body.title, req.body.article);

    _article["default"].push(article);

    res.status(200).json({
      status: 200,
      message: 'article successfully created',
      data: {
        createdOn: (0, _moment["default"])().format('YY-MM-DD H:m'),
        title: article.title,
        articleId: article.articleId
      }
    });
  },
  viewOneArticle: function viewOneArticle(req, res) {
    var article = _userHelper["default"].findArticle(req.params.id);

    if (!article) {
      res.status(404).json({
        status: 404,
        message: 'Articles not found'
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'success',
      data: article
    });
  },
  viewSortedArticles: function viewSortedArticles(req, res) {
    var sortedArticles = _article["default"].sort(function (a, b) {
      return (0, _moment["default"])(new Date(b.createdOn)).format('YYYYMMDD') - (0, _moment["default"])(new Date(a.createdOn)).format('YYYYMMDD');
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      data: sortedArticles
    });
  },
  editArticle: function editArticle(req, res) {
    var articleToEdit = _userHelper["default"].findArticle(req.params.id);

    if (!articleToEdit) {
      return res.status(404).json({
        staus: 404,
        message: 'article with given id is not found'
      });
    }

    if (!_userHelper["default"].checkAuthor(req)) {
      return res.status(401).json({
        status: 401,
        message: 'user is not allowed to edit this article'
      });
    }

    if (req.body.title) {
      articleToEdit.title = req.body.title;
    }

    if (req.body.article) {
      articleToEdit.article = req.body.article;
    }

    return res.status(200).json({
      status: 200,
      message: 'article successfully edited',
      data: {
        title: articleToEdit.title,
        article: articleToEdit.article
      }
    });
  },
  deleteArticle: function deleteArticle(req, res) {
    var status;
    var message;

    var toDelete = _userHelper["default"].findArticle(req.params.id);

    if (toDelete) {
      if (_userHelper["default"].checkAuthor(req)) {
        var index = _article["default"].indexOf(toDelete);

        _article["default"].splice(index, 1);

        return res.sendStatus(204);
      }

      status = 401;
      message = 'authentication failed';
    } else {
      status = 404;
      message = 'article not found';
    }

    return res.status(status).json({
      status: status,
      message: message
    });
  }
};
var _default = articleController;
exports["default"] = _default;