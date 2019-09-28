import express from 'express';
import { signup, signin } from '../controllers/userController';
import articleController from '../controllers/articleController';
import authentication from '../middlewares/authentication';

const router = express.Router();
router.use(express.json());
router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
// console.log(articleController.shareArticles);
router.post('/auth/articles', authentication.auth, articleController.shareArticles);
export default router;
