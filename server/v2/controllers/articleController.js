/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */

import Articles from '../models/article';

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
        data: {
          articles,
        },
      });
    } catch (error) {
      return res.status(400).json({
        statu: 400,
        error: `Error occured during retrieving articles: ${error}`,
      });
    }
  }

  async viewOneArticle(req, res) {
    try {
      const [article] = await Articles.findOneArticle(req.params.id);
      return res.status(200).json({
        status: 200,
        data: {
          article,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: `Error occured during retrieving article: ${error}`,
      });
    }
  }

  async deleteArticle(req, res) {
    try {
      const [article] = await Articles.findOneArticle(req.params.id);
      if (!article) {
        return res.status(401).json({
          status: 401,
          error: 'Article is not found!',
        });
      }
      if (article) {
        
        if (article.authorid === req.payload.id) {
          try {
            await Articles.deleteArticle(req.params.id);

            res.status(200).json({
              status: 200,
              message: 'Article is deleted',
            });
          } catch (error) {
            return res.status(401).json({
              status: 401,
              error: `Error occured: ${error}`,
            });
          }
        }
      } else {
        return res.status(400).json({
          status: 400,
          error: 'Unauthorized user',
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: `Article is not found: ${error}`,
      });
    }
  }

  async editArticle(req, res) {
    try {
      const [article] = await Articles.findOneArticle(req.params.id);
      if (article) {
        if (req.payload.id === article.id) {
          const articleToEdit = {
            newTitle: req.body.title || article.title,
            newArticle: req.body.article || article.article,
          };
          try {
            const [isEdited] = await Articles.updateArticle(articleToEdit);
            console.log(isEdited);
            if (isEdited) {
              return res.status(201).json({
                status: 201,
                message: 'Article Modified',
                data: {
                  isEdited,
                },
              });
            } return res.status(401).json({
              status: 400,
              error: 'Article not found',
            });
          } catch (error) {
            return res.status(401).json({
              status: 400,
              error,
            });
          }
        }
      }
      return res.status(401).json({
        status: 400,
        error: `ni hatari: ${error}`,
      });
    } catch (error) {
      return res.status(401).json({
        status: 400,
        error,
      });
    }
  }
}
export default new ArticleController();
