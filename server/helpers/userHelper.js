/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import users from '../models/user';

config();

const helper = {
  getUser(email) {
    const user = users.find((u) => u.email === email);
    return user;
  },
  generateUserToken(email) {
    const token = jwt.sign({ email }, process.env.TOKEN_KEY);
    return token;
  },
  addUser(req) {
    const newUser = {
      id: users.length + 1,
      token: this.generateUserToken(req.body.email),
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: this.securePassword(req.body.password),
      gender: req.body.gender,
      jobRole: req.body.jobRole,
      department: req.body.department,
      address: req.body.address,
      isAdmin: false,
    };
    users.push(newUser);
    return this.token;
  },

  validateUser(user) {
    const schema = {
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().min(3).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      gender: Joi.string().required(),
      jobRole: Joi.string().min(3).required(),
      department: Joi.string().required(),
      address: Joi.string().required(),
      isAdmin: Joi.boolean().required(),

    };
    return Joi.validate(user, schema);
  },
  securePassword(password) {
    const hashPasswod = bcrypt.hashSync(password, 10);
    return hashPasswod;
  },
};
export default helper;
