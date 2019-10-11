/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import uuid1 from 'uuidv1'; 
import query from './index';
import Helper from '../../helpers/userHelper';


class UserModel {
  async addNewUser(user) {
    const userquery = {
      text: `INSERT INTO users (id, firstName, lastName, email, password, gender, jobrole, department, address, isadmin)
        values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *`,
      values: [uuid1(), user.firstName, user.lastName, user.email, Helper.securePassword(user.password), user.gender, user.jobRole, user.department, user.address, user.isadmin],
    };
    try {
      const newUser = await query(userquery);
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUser(email) {
    const userquery = {
      text: 'SELECT * FROM users WHERE users.email = $1',
      values: [email],
    };
    try {
      const users = await query(userquery);
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default new UserModel();
