import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
let token;
let articleId;

describe('Writing Article', () => {
  it('employee should first signup', () => {
    const validUser = {
      firstName: 'seth',
      lastName: 'Bizimana',
      email: 'eric@gmail.com',
      password: '12345678',
      gender: 'male',
      jobRole: 'software engineer',
      department: 'software development',
      address: 'kigali',
      isAdmin: false,
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(validUser)
      .end((err, res) => {
        // token = res.body.data.token;
      });
  });
  it('employee login before writing article', () => {
    const validLogin = {
      email: 'eric@gmail.com',
      password: '12345678',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(validLogin)
      .end((err, res) => {
        token = res.body.data.access_token;
      });
  });
  it('employee should post with article and valid token', () => {
    const validArticle = {
      title: 'technology',
      article: 'hello world this andela developer challenge',
    };
    chai.request(app)
      .post('/api/v1/articles')
      .set('Authorization', `Bearer ${token}`)
      .send(validArticle)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        articleId = res.body.data.articleId;
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.eql('article successfully created');
        // expect(res.body.data.title).to.be.a('string');
      });
  });
  it('employee can not post article with invalid token', () => {
    const validArticle = {
      title: 'technology',
      article: 'hello world this andela developer challenge',
    };
    chai.request(app)
      .post('/api/v1/articles')
      .send(validArticle)
      .end((err, res) => {
        expect(res.status).to.eql(403);
      });
  });
});
describe('View Articles', () => {
  it('Employee should see all articles with valid token', () => {
    chai.request(app)
      .get('/api/v1/feeds')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data).to.be.a('array');
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.eql('success');
        expect(res.body.data).to.be.a('array');
        // expect(res.body.data.comments).to.be.a('array');
      });
  });
  it('Employee should not see  articles without valid token', () => {
    chai.request(app)
      .get('/api/v1/feeds')
      .end((err, res) => {
        expect(res.status).to.eql(403);
      });
  });
});
describe('Edit Article', () => {
  it('employee should be able to edit their articles', () => {
    const toEdit = {
      title: 'artificial intelligence',
      article: 'hello world have you ever been stressfull on extreme point?',
    };
    chai.request(app)
      .patch(`/api/v1/articles/${articleId}`)
      .send(toEdit)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.eql('article successfully edited');
      });
  });
  it('employee can only edit his/her own artcle', () => {
    const art = { title: 'cloud computing' };
    chai.request(app)
      .patch('/api/v1/articles/art-e1948e30-e293-11e9-8d3f-efdf56617361')
      .send(art)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eql(401);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.eql('user is not allowed to edit this article');
      });
  });
  it('employee can not edit non existing article', () => {
    const art = { title: 'cloud computing' };
    chai.request(app)
      .patch('/api/v1/articles/a15')
      .send(art)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eql(404);
      });
  });
});
