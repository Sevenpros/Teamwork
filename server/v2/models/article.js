/* eslint-disable class-methods-use-this */
import uuidv1 from 'uuidv1';
import moment from 'moment';
import query from './index';

class Articles {
  async saveArticle(article) {
    const userquery = {
      text: 'INSERT INTO articles (id, title, article, authorid, createdon,categories) values($1, $2, $3, $4, $5, $6) returning *',
      values: [uuidv1(), article.title, article.article, article.authorid, moment().format('YYYY-MM-DD'), article.categories],
    };
    try {
      const result = await query(userquery);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOneArticle(articleId) {
    const userquery = {
      text: 'SELECT * FROM articles WHERE id = $1',
      values: [articleId],
    };
    try {
      const article = await query(userquery);
      return article;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllArticles() {
    const userquery = 'SELECT * FROM articles ORDER BY createdon DESC';
    try {
      const allArticles = await query(userquery);
      return allArticles;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteArticle(articleId) {
    const userquery = {
      text: 'DELETE FROM articles WHERE id = $1',
      values: [articleId],
    };
    await query(userquery)
      .then((res) => res)
      .catch((error) => { throw new Error(error); });
  }

  async updateArticle(article, id) {
    const userquery = {
      text: 'UPDATE articles SET title = $2, article = $3, categories = $4 WHERE id = $1 returning *',
      values: [id, article.newTitle, article.newArticle, article.newCategory],
    };
    try {
      const result = await query(userquery);
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }
}
export default new Articles();
