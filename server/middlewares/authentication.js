/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import helper from '../helpers/userHelper';

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
}
export default new Authentication();
