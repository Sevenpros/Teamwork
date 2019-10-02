import express from 'express';
import User from '../controllers/userController';
import ArticleController from '../controllers/articleController';
import authentication from '../middlewares/authentication';

const router = express.Router();
router.use(express.json());
router.post('/auth/signup', User.signup);
router.post('/auth/signin', User.signin);
router.post('/articles', authentication.auth, ArticleController.shareArticles);
router.get('/feeds', authentication.auth, ArticleController.viewSortedArticles);
router.patch('/articles/:id', authentication.auth, ArticleController.editArticle);
router.delete('/articles/:id', authentication.auth, ArticleController.deleteArticle);
router.post('/articles/:id/comments', authentication.auth, ArticleController.addComment);
router.get('/articles/:id', authentication.auth, ArticleController.viewOneArticle);
export default router;
