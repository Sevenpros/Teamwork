import express from 'express';
import { signup, signin } from '../controllers/userController';

const router = express.Router();
router.use(express.json());
router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
export default router;
