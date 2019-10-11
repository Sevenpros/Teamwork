/* eslint-disable class-methods-use-this */
import moment from 'moment';
import uuidv1 from 'uuidv1';
import articles from '../models/article';
import ArticleHelper from '../helpers/articleHelper';
import Validation from '../helpers/validation';
import Helper from '../helpers/userHelper';

class ArticleController {
  shareArticles(req, res) {
    // eslint-disable-next-line max-len
    const article = req.body;
    ArticleHelper.AddArticle(article);
    res.status(200).json({
      status: 200,
      message: 'article successfully created',
      data: {
        createdOn: moment().format('YY-MM-DD H:m'),
        title: article.title,
        articleId: articles[articles.length - 1].articleId,
      },
    });
  }

  viewOneArticle(req, res) {
    const article = ArticleHelper.findArticle(req.params.id);
    if (!article) {
      return res.status(404).json({
        status: 404,
        message: 'Articles not found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: article,
    });
  }

  viewSortedArticles(req, res) {
    const sortedArticles = articles.sort((a, b) => moment(new Date(b.createdOn)).format('YYYYMMDD') - moment(new Date(a.createdOn)).format('YYYYMMDD'));
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: sortedArticles,
    });
  }

  editArticle(req, res) {
    const articleToEdit = ArticleHelper.findArticle(req.params.id);

    if (!articleToEdit) {
      return res.status(404).json({
        staus: 404,
        message: 'article with given id is not found',
      });
    }
    // if (!ArticleHelper.checkAuthor(req)) {
    //   return res.status(401).json({
    //     status: 401,
    //     message: 'user is not allowed to edit this article',
    //   });
    // }

    if (req.body.title) {
      articleToEdit.title = req.body.title;
    }
    if (req.body.article) {
      articleToEdit.article = req.body.article;
    }
    if (req.body.categories) {
      articleToEdit.article = req.body.article;
    }
    return res.status(200).json({
      status: 200,
      message: 'article successfully edited',
      data: {
        title: articleToEdit.title,
        article: articleToEdit.article,
      },
    });
  }

  deleteArticle(req, res) {
    const toDelete = ArticleHelper.findArticle(req.params.id);
    if (toDelete) {
      const index = articles.indexOf(toDelete);
      articles.splice(index, 1);
      return res.sendStatus(204);
    }

    return res.status(404).json({
      status: 404,
      message: 'article not found',
    });
  }

  addComment(req, res) {
    let status;
    let message;
    const { error } = Validation.validateComment(req.body);
    if (error) {
      
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/[/"]/g, ''),
      });
    }
    const articleToComment = ArticleHelper.findArticle(req.params.id);
    if (articleToComment) {
      const author = Helper.getUser(req.payload.id);
      const userComment = {
        commentId: `$comment-${uuidv1()}`,
        authorId: author.id,
        comment: req.body.comment,
      };
      articleToComment.comments.push(userComment);
      
      return res.status(201).json({
        status: 201,
        message: 'comment added successfully',
        data: req.body.comment,
      });
    }
   
    return res.status(404).json({
      status: 404,
      message: 'article with provided id is not found',
    });
  }
}

export default new ArticleController();
