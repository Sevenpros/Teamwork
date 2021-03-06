/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */

import moment from 'moment';
import Articles from '../models/article';
import Comments from '../models/comment';

class ArticleController {
  async shareArticles(req, res) {
    try {
      const [...savedArticle] = await Articles.saveArticle(req.body);
      const [art] = savedArticle;
      if (savedArticle) {
        res.status(200).json({
          status: 200,
          message: 'article successfully created',
          data: {
            articleId: art.id,
            title: art.title,
            createdOn: art.createdon,
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

  async viewArticles(req, res) {
    try {
      const articles = await Articles.getAllArticles();
      return res.status(200).json({
        status: 200,
        data: { articles },
      });
    } catch (error) {
      return res.status(500).json({
        statu: 500,
        error: `Error occured during retrieving articles: ${error}`,
      });
    }
  }

  async viewOneArticle(req, res) {
    try {
      const [article] = await Articles.findOneArticle(req.params.id);
      const comments = await Comments.viewComment(article.id);
      return res.status(200).json({
        status: 200,
        data: {
          title: article.title,
          article: article.article,
          createdon: article.createdon,
          comments,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: `Error occured during retrieving article: ${error}`,
      });
    }
  }

  async deleteArticle(req, res) {
    await Articles.deleteArticle(req.params.id)
      .then(() => {
        res.status(200).json({
          status: 200,
          message: 'Article is Deleted',
        });
      })
      .catch((error) => {
        res.status(500).json({
          satatus: 500,
          error: `Article is not deleted: ${error}`,
        });
      });
  }

  async editArticle(req, res) {
    const [article] = await Articles.findOneArticle(req.params.id);
    const articleToEdit = {
      newTitle: req.body.title || article.title,
      newArticle: req.body.article || article.article,
      newCategory: req.body.categories || article.categories,
    };
    try {
      const [isEdited] = await Articles.updateArticle(articleToEdit, req.params.id);
      res.status(200).json({
        status: 201,
        message: 'Article is Edited',
        data: {
          title: isEdited.title,
          article: isEdited.article,
          updatedon: moment().format('YYYY-MM-DD'),
        },
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: `Some went wrong: ${e}`,
      });
    }
  }

  async addComment(req, res) {
    // eslint-disable-next-line max-len
    const comment = { authorid: req.payload.id, articleid: req.params.id, comment: req.body.comment };
    try {
      const [...result] = await Comments.addComment(comment);
      return res.status(201).json({
        status: 201,
        message: 'Comment Added',
        data: result,
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        message: `Error occured:${e}`,
      });
    }
  }
}
export default new ArticleController();
