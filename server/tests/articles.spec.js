import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
let token;

describe('Writing Article', () => {
  it('employee should first signup', (done) => {
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
      .post('/auth/signup')
      .send(validUser)
      .end((err, res) => {
        done();
      });
  });
  it('employee login before writing article', () => {
    const validLogin = {
      email: 'eric@gmail.com',
      password: '12345678',
    };
    chai.request(app)
      .post('/auth/signin')
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
      .post('/auth/articles')
      .set('Authorization', `Bearer ${token}`)
      .send(validArticle)
      .end((err, res) => {
        console.log(JSON.stringify(res.body));
        expect(res.status).to.eql(200);
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
      .post('/auth/articles')
      .send(validArticle)
      .end((err, res) => {
        expect(res.status).to.eql(403);
      });
  });
});
