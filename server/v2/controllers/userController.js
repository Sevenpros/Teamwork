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
          token: Helper.generateUserToken(req.body.email),
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
    const [user] = await UserModel.getUser(req.body.email);
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
export default new UserController();
