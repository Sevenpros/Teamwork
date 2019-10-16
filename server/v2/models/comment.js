/* eslint-disable class-methods-use-this */
import moment from 'moment';
import uuidv1 from 'uuidv1';
import query from './index';

class Comments {
  async addComment(comment) {
    const userquery = {
      text: 'INSERT INTO comments (id, authorid, articleid, comment, createdon) values($1, $2, $3, $4, $5) returning *',
      values: [uuidv1(), comment.authorid, comment.articleid, comment.comment, moment().format('YYYY-MM-DD')],
    };
    try {
      const result = await query(userquery);
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  async viewComment(id) {
    const userquery = {
      text: 'SELECT * FROM comments WHERE articleid = $1',
      values: [id],
    };
    try {
      const comment = await query(userquery);
      return comment;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default new Comments();
