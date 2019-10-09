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
          Names: `${user.fistname} ${user.lastname}`,
        },
      });
    } catch (err) {
      res.status(401).json({
        status: 401,
        message: `Error occured: ${err}`,
      });
    }
  }
}
export default new UserController();
