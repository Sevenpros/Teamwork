/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */

import Helper from '../helpers/userHelper';
import UserModel from '../models/user';
import users from '../models/users';
import Validation from '../helpers/validation';

class User {
  signup(req, res) {
    let status;
    let message;
    let data;
    const { error } = Validation.validateUser(req.body);
    if (error) {
      status = 400;
      message = error.details[0].message.replace(/[/"]/g, '');
      return res.status(status).json({
        status,
        message,
      });
    }
    if (Helper.getUser(req.body.email)) {
      status = 401;
      message = 'Email already exist';
    } else {
      try {
        UserModel.addNewUser(req.body);
        return res.status(200).json({
          status: 201,
          message: 'user created successfuly',
          data: {
            token: Helper.generateUserToken(req.body.email),
          },
        });
      } catch (err) {
        res.status(401).json({
          status: 401,
          message: `error occured: ${err}`,
        });
      }
    }

    return res.status(status).json({
      status: 400,
      message: 'something went wrong',
      data,
    });
  }

  signin(req, res) {
    const user = Helper.getUser(req.body.email);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }
    if (!Helper.matchUser(req.body.password, user.password)) {
      return res.status(401).json({
        status: 401,
        message: 'Invalid login credintials',
      });
    }

    const token = Helper.generateUserToken(req.body.email);
    return res.status(200).json({
      status: 200,
      message: 'user is successfully logged in',
      data: { access_token: token },
    });
  }
}
export default new User();
