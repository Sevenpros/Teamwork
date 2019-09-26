import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const validUser = {
  firstName: 'seth',
  lastName: 'Bizimana',
  email: 'seth@gmail.com',
  password: '12345678',
  gender: 'male',
  jobRole: 'software engineer',
  department: 'software development',
  address: 'kigali',
  isAdmin: false,
};
const validLogin = {
  email: 'seth@gmail.com',
  password: '12345678',
};
const invalidLogin = {
  email: 'hello world',
  password: 'hello',
};
const wrongPassword = {
  email: 'seth@gmail.com',
  password: 'hello',
};
describe('SIGN UP', () => {
  it('should post the user info', () => {
    chai.request(app)
      .post('/auth/signup')
      .send(validUser)
      .end((err, res) => {
        expect(res.status).to.equals(201);
        expect(res.body.message).to.be.a('string');
        expect(res.body.data).to.be.a('string');
      });
  });
  it('should not post the same user twice', () => {
    chai.request(app)
      .post('/auth/signup')
      .send(validUser)
      .end((err, res) => {
        expect(res.status).to.equals(401);
        expect(res.body.message).to.be.a('string');
      });
  });
  it('should not post uncompleted info ', () => {
    chai.request(app)
      .post('/auth/signup')
      .send('')
      .end((err, res) => {
        expect(res.status).to.equals(400);
        expect(res.body.message).to.be.a('string');
      });
  });
});

describe('LOGIN', () => {
  it('should login with valid credentials', () => {
    chai.request(app)
      .post('/auth/signin')
      .send(validLogin)
      .end((err, res) => {
        expect(res.status).to.equals(200);
        expect(res.body.message).to.be.a('string');
      });
  });
  it('should login with non existing email address', () => {
    chai.request(app)
      .post('/auth/signin')
      .send(invalidLogin)
      .end((err, res) => {
        expect(res.status).to.equals(404);
        expect(res.body.message).to.be.a('string');
      });
  });
  it('should wrong password', () => {
    chai.request(app)
      .post('/auth/signin')
      .send(wrongPassword)
      .end((err, res) => {
        expect(res.status).to.equals(401);
        expect(res.body.message).to.be.a('string');
      });
  });
});
