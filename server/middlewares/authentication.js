/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import helper from '../helpers/userHelper';
import Validation from '../helpers/validation';

class Authentication {
  auth(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const token = bearer[1];
      try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.payload = decoded;
        next();
      } catch (error) {
        res.status(401).json({
          status: 401,
          error: 'imvalid token',
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
}
export default new Authentication();
