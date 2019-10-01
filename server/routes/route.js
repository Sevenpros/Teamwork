import express from 'express';
import { signup, signin } from '../controllers/userController';
import articleController from '../controllers/articleController';
import authentication from '../middlewares/authentication';

const router = express.Router();
router.use(express.json());
router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.post('/articles', authentication.auth, articleController.shareArticles);
router.get('/feeds', authentication.auth, articleController.viewSortedArticles);
router.patch('/articles/:id', authentication.auth, articleController.editArticle);
router.delete('/articles/:id', authentication.auth, articleController.deleteArticle);
router.post('/articles/:id/comments', authentication.auth, articleController.addComment);
export default router;
