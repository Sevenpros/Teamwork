/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import uuidv1 from 'uuidv1';
import { Pool } from 'pg';
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

  addUser(req) {
    const newUser = {
      id: `emp-${uuidv1()}`,
      token: this.generateUserToken(req.body.email),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: this.securePassword(req.body.password),
      gender: req.body.gender,
      jobRole: req.body.jobRole,
      department: req.body.department,
      address: req.body.address,
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
