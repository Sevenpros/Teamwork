/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import uuidv1 from 'uuidv1';
import users from '../models/users';


config();

class Helper {
  getUser(email) {
    const user = users.find((u) => u.email === email);
    return user;
  }

  generateUserToken(id, email) {
    const token = jwt.sign({ id, email }, process.env.TOKEN_KEY);
    return token;
  }

  matchUser(plain, hash) {
    return bcrypt.compareSync(plain, hash);
  }

  addUser(user) {
    const newUser = {
      id: `emp-${uuidv1()}`,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: this.securePassword(user.password),
      gender: user.gender,
      jobRole: user.jobRole,
      department: user.department,
      address: user.address,
      isAdmin: false,
    };
    users.push(newUser);
  }

  securePassword(password) {
    if (!password) {
      // return;
    }
    const hashPasswod = bcrypt.hashSync(password, 10);
    return hashPasswod;
  }
}
export default new Helper();
