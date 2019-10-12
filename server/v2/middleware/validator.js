/* eslint-disable class-methods-use-this */
import validator from 'validator';
import Articles from '../models/article';

class Validator {
  async isUUID(req, res, next) {
    const isValid = validator.isUUID(req.params.id);
    if (!isValid) {
      return res.status(400).json({
        status: 400,
        message: 'Provide a Valid UUID',
      });
    }
    return next();
  }

  async isArticle(req, res, next) {
    try {
      const [article] = await Articles.findOneArticle(req.params.id);
      if (article) { return next(); }
      return res.status(404).json({
        status: 404,
        message: 'Article With provided id is not found',
      });
    } catch (error) {
      return res.statu(500).json({
        status: 500,
        message: error,
      });
    }
  }

  async isOwner(req, res, next) {
    const [article] = await Articles.findOneArticle(req.params.id);
    if (article.authorid === req.payload.id) { return next(); }
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized user',
    });
  }
}
export default new Validator();
