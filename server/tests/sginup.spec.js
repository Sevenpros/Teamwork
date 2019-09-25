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
  })
  it('should not post uncompleted info ', () => {
    chai.request(app)
      .post('/auth/signup')
      .send('')
      .end((err, res) => {
        expect(res.status).to.equals(400);
        expect(res.body.message).to.be.a('string');
      });
  })
});
