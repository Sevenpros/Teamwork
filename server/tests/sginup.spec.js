import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

describe('SIGN UP', () => {
  it('should post the user info', () => {
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
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(validUser)
      .end((err, res) => {
        expect(res.status).to.equals(201);
        expect(res.body.message).to.be.a('string');
        expect(res.body.data.token).to.be.a('string');
      });
  });
  it('should not post the same user twice', () => {
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
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(validUser)
      .end((err, res) => {
        expect(res.status).to.equals(401);
        expect(res.body.message).to.be.a('string');
      });
  });
  it('should not post uncompleted info ', () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send('')
      .end((err, res) => {
        expect(res.status).to.equals(400);
        expect(res.body.message).to.be.a('string');
      });
  });
});

describe('LOGIN', () => {
  it('should login with valid credentials', () => {
    const validLogin = {
      email: 'seth@gmail.com',
      password: '12345678',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(validLogin)
      .end((err, res) => {
        expect(res.status).to.equals(200);
        expect(res.body.message).to.be.a('string');
      });
  });
  it('should login with non existing email address', () => {
    const invalidLogin = {
      email: 'hello world',
      password: 'hello',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(invalidLogin)
      .end((err, res) => {
        expect(res.status).to.equals(404);
        expect(res.body.message).to.be.a('string');
      });
  });
  it('should wrong password', () => {
    const wrongPassword = {
      email: 'seth@gmail.com',
      password: 'hello',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(wrongPassword)
      .end((err, res) => {
        expect(res.status).to.equals(401);
        expect(res.body.message).to.be.a('string');
      });
  });
});
