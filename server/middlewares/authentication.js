/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import helper from '../helpers/userHelper';

const authentication = {
  auth(req, res, next) {
    const bearerHeader = req.headers.authorization;
    // console.log('bearer: ' +bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const token = bearer[1];
      try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.payload = decoded;
      } catch (error) {
        res.status(401).json({
          status: 401,
          error: 'imvalid token',
        });
      }
      const { email } = req.payload;
      const user = helper.getUser(email);
      if (!user) {
        res.status(401).json({
          status: 401,
          message: 'Aunthentication failed',
        });
      }
      req.body.authorId = user.id;
      req.body.authorName = `${user.firstName} ${user.lastName}`;
      next();
    }
    else {
      res.status(403).json({
        status: 403,
        message: 'Forbidden',
      });
    }
  },

};

export default authentication;
