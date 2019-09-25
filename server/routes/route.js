import express from 'express';
import { signup } from '../controllers/userController';

const router = express.Router();
router.use(express.json());
router.post('/', signup);

export default router;
