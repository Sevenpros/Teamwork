import express from 'express';
import UserController from '../controllers/userController';
import Authentication from '../../middlewares/authentication';
import ArticleController from '../controllers/articleController';

const dbRouter = express.Router();

dbRouter.post('/auth/signup', Authentication.isValidUser, UserController.signup);
dbRouter.post('/auth/signin', UserController.signin);
dbRouter.post('/articles', Authentication.auth, Authentication.isValidArticle, ArticleController.shareArticles);
dbRouter.get('/feeds', Authentication.auth, ArticleController.viewArticles);
dbRouter.get('/articles/:id', Authentication.auth, ArticleController.viewOneArticle);
dbRouter.delete('/articles/:id', Authentication.auth, ArticleController.deleteArticle);
dbRouter.patch('/articles/:id', Authentication.auth, ArticleController.editArticle);

export default dbRouter;
