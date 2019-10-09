import express from 'express';
import UserController from '../controllers/userController';
import Authentication from '../../middlewares/authentication';
import ArticleController from '../controllers/articleController';

const dbRouter = express.Router();
dbRouter.use(express.json());
dbRouter.post('/auth/signup', UserController.signup);
dbRouter.post('/articles', Authentication.auth, ArticleController.shareArticles);


export default dbRouter;
