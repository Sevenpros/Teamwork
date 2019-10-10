import express from 'express';
import UserController from '../controllers/userController';
import Authentication from '../../middlewares/authentication';
import ArticleController from '../controllers/articleController';

const dbRouter = express.Router();
 ft-write-article-169029075
dbRouter.post('/auth/signup', Authentication.isValidUser, UserController.signup);
dbRouter.post('/articles', Authentication.auth, ArticleController.shareArticles);



export default dbRouter;
