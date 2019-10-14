/* eslint-disable class-methods-use-this */
import UserModel from '../models/user';
import Helper from '../../helpers/userHelper';

class UserController {
  async signup(req, res) {
    try {
      const [user] = await UserModel.addNewUser(req.body);
      res.status(201).json({
        status: 201,
        message: 'User created successfuly',
        data: {
          token: Helper.generateUserToken(user.id, user.email),
          Names: `${user.firstname} ${user.lastname}`,
        },
      });
    } catch (err) {
      res.status(401).json({
        status: 401,
        message: `Error occured: ${err}`,
      });
    }
  }

  async signin(req, res) {
    try {
      const [user] = await UserModel.getUser(req.body.email);
      if (user) {
        if (Helper.matchUser(req.body.password, user.password)) {
          return res.status(201).json({
            status: 201,
            message: 'User successfully Logged In',
            token: Helper.generateUserToken(user.id, user.email),
          });
        }
        return res.status(400).json({
          status: 400,
          error: 'Invalid credentials',
        });
      }

      return res.status(400).json({
        status: 400,
        error: 'Email doesn\'t exist',
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: `Error Occured during login ${error}`,
      });
    }
  }
}
export default new UserController();
