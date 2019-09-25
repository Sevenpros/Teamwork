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

export const signin = (req, res) => {
  const user = helper.getUser(req.body.email);
  if (!user) {
    return res.status(404).json({
      status: 404,
      message: 'User not found',
    });
  }
  if (!helper.matchUser(req.body.password, user.password)) {
    return res.status(401).json({
      status: 401,
      message: 'Invalid login credintials',
    });
  }

  const token = helper.generateUserToken(req.body.email);
  return res.status(200).json({
    status: 200,
    message: 'user is successfully logged in',
    data: token,
  });
};
