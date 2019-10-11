import express from 'express';
import User from '../controllers/userController';
import ArticleController from '../controllers/articleController';
import Authentication from '../middlewares/authentication';

const router = express.Router();
router.use(express.json());
router.post('/auth/signup', User.signup);
router.post('/auth/signin', User.signin);
router.post('/articles', Authentication.auth, Authentication.isValidArticle, ArticleController.shareArticles);
router.get('/feeds', Authentication.auth, ArticleController.viewSortedArticles);
router.patch('/articles/:id', Authentication.auth, ArticleController.editArticle);
router.delete('/articles/:id', Authentication.auth, ArticleController.deleteArticle);
router.post('/articles/:id/comments', Authentication.auth, ArticleController.addComment);
router.get('/articles/:id', Authentication.auth, ArticleController.viewOneArticle);
export default router;
