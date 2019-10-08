/* eslint-disable class-methods-use-this */
import Validation from '../../helpers/validation';
import UserModel from '../models/user';
import Helper from '../../helpers/userHelper';

class UserController {
  async signup(req, res) {
    const { error } = Validation.validateUser(req.body);
    if (error) {
      return res.status(401).json({
        message: error.details[0].message.replace(/[/"]/g, ''),
      });
    }
    const userResult = await UserModel.getUser(req.body.email);
    console.log(userResult);
    if (userResult.length) {
      return res.status(401).json({
        status: 401,
        message: 'user already exist',
      });
    }


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


    return res.status(400).json({
      status: 400,
      message: 'something went wrong',
    });
  }
}
export default new UserController();
