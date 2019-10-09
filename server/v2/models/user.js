/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import uuid1 from 'uuidv1';
import connectDb from './index';


class UserModel {
  async addNewUser(user) {
    const query = {
      text: `INSERT INTO users (id, firstName, lastName, email, password, gender, job_role, department, address, is_admin)
        values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *`,
      values: [uuid1(), user.firstName, user.lastName, user.email, user.password, user.gender, user.jobRole, user.department, user.address, user.isadmin],
    };
    const newUser = await connectDb(query);
    return newUser;
  }

  async getUser(email) {
    const query = {
      text: 'SELECT * FROM users WHERE users.email = $1',
      values: [email],
    };
    const user = await connectDb(query);
    return user;
  }
}
export default new UserModel();
