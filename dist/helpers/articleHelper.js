"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _uuidv = _interopRequireDefault(require("uuidv1"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArticleHelper = function ArticleHelper(authorId, authorName, title, article) {
  _classCallCheck(this, ArticleHelper);

  this.articleId = "art-".concat((0, _uuidv["default"])());
  this.authorId = authorId;
  this.authorName = authorName;
  this.title = title;
  this.article = article;
  this.createdOn = (0, _moment["default"])().format('YY-MM-DD H:m');
  this.comments = [];
};

var _default = ArticleHelper;
exports["default"] = _default;