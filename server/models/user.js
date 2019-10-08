/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import uuid1 from 'uuidv1';
import connectDb from './index';


// eslint-disable-next-line class-methods-use-this
class UserModel {
  // eslint-disable-next-line class-methods-use-this
  addNewUser(user) {
    const query = {
      text: `INSERT INTO users (id, firstName, lastName, email, password, gender, job_role, department, address, is_admin)
        values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *`,
      values: [uuid1(), user.firstName, user.lastName, user.email, user.password, user.gender, user.jobRole, user.department, user.address, user.isadmin],
    };
    connectDb(query);
  }
}
export default new UserModel();
