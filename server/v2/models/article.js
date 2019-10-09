/* eslint-disable class-methods-use-this */
import uuidv1 from 'uuidv1';
import moment from 'moment';
import connectDb from './index';

class Articles {
  async saveArticle(article) {
    const query = {
      text: 'INSERT INTO articles (article_id, author_id, title, article, created_on) values($1, $2, $3, $4, $5) returning *',
      values: [uuidv1(), article.authorId, article.title, article.article, moment().format('YYYY-MM-DD')],
    };
    const result = await connectDb(query);
    return result;
  }

  async findOneArticle(articleId) {
    const query = {
      test: 'SELECT * FROM articles WHERE article_id = $1',
      values: [articleId],
    };
    const foundArticle = await connectDb(query);
    return foundArticle;
  }

  async getAllArticle() {
    const query = 'SELECT * FROM articles ORDER BY created_on DESC';
    const allArticles = await connectDb(query);
    return allArticles;
  }

  async deleteArticle(articleId) {
    const query = {
      text: 'DELETE FROM articles WHERE article_id = $1',
      values: [articleId],
    };
    const result = await connectDb(query);
    return result;
  }

  async updateTitle(article) {
    const query = {
      text: 'UPDATE articles SET title = $2 WHERE article_id = $1',
      values: [article.articleId, article.title],
    };
    const result = await connectDb(query);
    return result;
  }

  async updateArticle(article) {
    const query = {
      text: 'UPDATE articles SET article = $2 WHERE article_id = $1',
      values: [article.articleId, article.article],
    };
    const result = await connectDb(query);
    return result;
  }
}
export default new Articles();
