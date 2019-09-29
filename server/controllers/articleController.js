import moment from 'moment';
import articles from '../models/article';
import ArticleHelper from '../helpers/articleHelper';
import helper from '../helpers/userHelper';

const articleController = {
  shareArticles(req, res) {
    const { error } = helper.validateArticle(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        messge: error.details[0].message.replace(/[/"]/g, ''),
      });
    }

    // eslint-disable-next-line max-len
    const article = new ArticleHelper(req.body.authorId, req.body.authorName, req.body.title, req.body.article);
    articles.push(article);
    res.status(200).json({
      status: 200,
      message: 'article successfully created',
      data: {
        createdOn: moment().format('YY-MM-DD H:m'),
        title: article.title,
        articleId: article.articleId,
      },
    });
  },
  viewOneArticle(req, res) {
    const article = helper.findArticle(req.params.id);
    if (!article) {
      res.status(404).json({
        status: 404,
        message: 'Articles not found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: article,
    });
  },
  viewSortedArticles(req, res) {
    const sortedArticles = articles.sort((a, b) => moment(new Date(b.createdOn)).format('YYYYMMDD') - moment(new Date(a.createdOn)).format('YYYYMMDD'));
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: sortedArticles,
    });
  },
  editArticle(req, res) {
    const articleToEdit = helper.findArticle(req.params.id);

    if (!articleToEdit) {
      return res.status(404).json({
        staus: 404,
        message: 'article with given id is not found',
      });
    }
    if (!helper.checkAuthor(req)) {
      return res.status(401).json({
        status: 401,
        message: 'user is not allowed to edit this article',
      });
    }
    if (req.body.title) {
      articleToEdit.title = req.body.title;
    }
    if (req.body.article) {
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
  },
};

export default articleController;
