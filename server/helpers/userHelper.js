/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import uuidv1 from 'uuidv1';
import users from '../models/user';
import articles from '../models/article';

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
  matchUser(plain, hash) {
    return bcrypt.compareSync(plain, hash);
  },
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
  validateArticle(article) {
    const schema = {
      authorId: Joi.string().required(),
      authorName: Joi.string().required(),
      title: Joi.string().min(3).required(),
      article: Joi.string().min(10).required(),
    };
    return Joi.validate(article, schema);
  },
  findArticle(id) {
    if (!id) {
      // return;
    }
    const article = articles.find((art) => art.articleId === id);
    return article;
  },
  checkAuthor(req) {
    if (!req.payload) {
      // return;
    }
    const author = this.getUser(req.payload.email);
    const article = this.findArticle(req.params.id);
    return author.id === article.authorId;
  },
  securePassword(password) {
    if (!password) {
      // return;
    }
    const hashPasswod = bcrypt.hashSync(password, 10);
    return hashPasswod;
  },
};
export default helper;
