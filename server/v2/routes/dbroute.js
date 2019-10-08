import express from 'express';
import UserController from '../controllers/userController';
// import Authentication from '../middlewares/authentication';

const dbRouter = express.Router();
dbRouter.use(express.json());
dbRouter.post('/auth/signup', UserController.signup);


export default dbRouter;
