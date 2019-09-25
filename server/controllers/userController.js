/* eslint-disable import/prefer-default-export */
import helper from '../helpers/userHelper';
import users from '../models/user';

export const signup = (req, res) => {
  const { error } = helper.validateUser(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
  if (helper.getUser(req.body.email)) {
    res.status(401).json({
      status: 401,
      message: 'Email already exist',
    });
  }

  helper.addUser(req);
  return res.status(201).json({
    status: 201,
    message: 'User created successfully',
    data: users[users.length - 1].token,
  });
};
