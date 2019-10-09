/* eslint-disable class-methods-use-this */

import Articles from '../models/article';
import UserModel from '../models/user';
import Validation from '../../helpers/validation';

class ArticleController {
  async shareArticles(req, res) {
    const { email } = req.payload;
    const [user] = await UserModel.getUser(email);
    req.body.authorId = user.id;
    req.body.authorName = user.firstname;
    const { error } = Validation.validateArticle(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        messge: error.details[0].message.replace(/[/"]/g, ''),
      });
    }

    // eslint-disable-next-line max-len
    const article = req.body;
    try {
      const [...savedArticle] = await Articles.saveArticle(article);
      const [art] = savedArticle;
      if (savedArticle) {
        res.status(200).json({
          status: 200,
          message: 'article successfully created',
          data: {
            articleId: art.article_id,
            title: art.title,
            createdOn: art.created_on,
          },
        });
      }
    } catch (err) {
      res.status(400).json({
        status: 400,
        error: `some error occured during saving article: ${err}`,
      });
    }
  }
}

export default new ArticleController();
