/* eslint-disable class-methods-use-this */
import Joi from 'joi';

class Validation {
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
  }

  validateArticle(article) {
    const schema = {
      authorid: Joi.required(),
      title: Joi.string().min(3).required(),
      article: Joi.string().min(10).required(),
      categories: Joi.string().required(),


    };
    return Joi.validate(article, schema);
  }

  validateComment(comment) {
    const schema = {
      authorName: Joi.string(),
      authorid: Joi.string(),
      comment: Joi.string().min(5).required(),
    };
    return Joi.validate(comment, schema);
  }

  validateLogins(logins) {
    const schema = {
      email: Joi.string().required(),
      password: Joi.string().required(),
    };
    return Joi.validate(logins, schema);
  }
}
export default new Validation();
