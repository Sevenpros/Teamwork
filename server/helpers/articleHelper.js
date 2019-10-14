/* eslint-disable class-methods-use-this */
import uuidv1 from 'uuidv1';
import moment from 'moment';
import articles from '../models/article';
import Helper from './userHelper';

class ArticleHelper {
  AddArticle(article) {
    const newArticle = {
      articleId: `art-${uuidv1()}`,
      authorId: article.authorId,
      authorName: article.authorName,
      title: article.title,
      article: article.article,
      tcreatedOn: moment().format('YY-MM-DD H:m'),
      comments: [],
    };
    articles.push(newArticle);
  }

  findArticle(id) {
    if (!id) {
      // return;
    }
    const article = articles.find((art) => art.articleId === id);
    return article;
  }

  checkAuthor(req) {
    if (!req.payload) {
      // return;
    }
    const article = this.findArticle(req.params.id);
    console.log(req.payload.email);
    console.log(article.authorId);
    return req.payload.id === article.authorId;
  }
}

export default new ArticleHelper();
