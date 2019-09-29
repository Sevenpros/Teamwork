import uuidv1 from 'uuidv1';
import moment from 'moment';

class ArticleHelper {
  constructor(authorId, authorName, title, article) {
    this.articleId = `art-${uuidv1()}`;
    this.authorId = authorId;
    this.authorName = authorName;
    this.title = title;
    this.article = article;
    this.createdOn = moment().format('YY-MM-DD H:m');
    this.comments = [];
  }
}

export default ArticleHelper;
