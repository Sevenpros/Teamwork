import Moment from 'moment';
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
        createdOn: Moment().format('YY-MM-DD'),
        title: article.title,
      },
    });
  },
  viewSortedArticles(req, res) {
    const sortedArticles = articles.sort((a, b) => new Moment(a.createdOn).format('YYMMDD') - new Moment(b.createdOn).format('YYMMDD'))
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: sortedArticles,
    });
  },
};

export default articleController;
