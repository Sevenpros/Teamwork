import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
describe('SIGN UP USING DATABASE', () => {
  it('employee should be able to signup with valid info', () => {
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
      .post('/api/v2/auth/signup')
      .send(validUser)
      .end((err, res) => {
        expect(res.status).to.equals(201);
        expect(res.body.message).to.be.a('string');
        expect(res.body.data.token).to.be.a('string');
      });
  });
  it('employee should not signup twice', () => {
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
      .post('/api/v2/auth/signup')
      .send(validUser)
      .end((err, res) => {
        expect(res.status).to.equals(401);
        expect(res.body.message).to.be.a('string');
      });
  });
  it('should not signup with uncompleted info ', () => {
    const invalidData = {
      email: 'seth@gmail.com',
      password: '12345678',
      gender: 'male',
      jobRole: 'software engineer',
      department: 'software development',
      address: 'kigali',
      isAdmin: false,
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equals(401);
        expect(res.body.message).to.be.a('string');
      });
  });
});
