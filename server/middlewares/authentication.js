/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import Helper from '../helpers/userHelper';
import Validation from '../helpers/validation';
import UserModel from '../v2/models/user';

class Authentication {
  auth(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const token = bearer[1];
      try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.payload = decoded;
        if (req.payload.id) { req.body.authorid = req.payload.id; }
        next();
      } catch (error) {
        res.status(401).json({
          status: 401,
          error: 'invalid token',
        });
      }
    } else {
      res.status(403).json({
        status: 403,
        message: 'Forbidden',
      });
    }
  }

  isValidUser(req, res, next) {
    const { error } = Validation.validateUser(req.body);
    if (error) {
      return res.status(401).json({
        message: error.details[0].message.replace(/[/"]/g, ''),
      });
    }
    next();
  }

  async isValidArticle(req, res, next) {
    const { error } = Validation.validateArticle(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/[/"]/g, ''),
      });
    }
    next();
  }
}
export default new Authentication();
