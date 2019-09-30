"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController");

var _articleController = _interopRequireDefault(require("../controllers/articleController"));

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use(_express["default"].json());
router.post('/auth/signup', _userController.signup);
router.post('/auth/signin', _userController.signin);
router.post('/articles', _authentication["default"].auth, _articleController["default"].shareArticles);
router.get('/feeds', _authentication["default"].auth, _articleController["default"].viewSortedArticles);
router.patch('/articles/:id', _authentication["default"].auth, _articleController["default"].editArticle);
var _default = router;
exports["default"] = _default;