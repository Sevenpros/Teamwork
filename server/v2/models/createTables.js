import query from './index';
import Helper from '../../helpers/userHelper';
import userModel from './user';

const userTable = async () => {
  const userquery = `DROP TABLE IF EXISTS users;
  CREATE TABLE users
  (
    id UUID PRIMARY KEY,
    firstname VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    gender VARCHAR(128) NOT NULL,
    jobRole VARCHAR(128) NOT NULL,
    address VARCHAR(128) NOT NULL,
    department VARCHAR(128) NOT NULL,
    isAdmin BOOLEAN
  )`;
  try {
    await query(userquery);
  } catch (error) {
    console.log(error.message);
  }
};

const articleTable = async () => {
  const userquery = `DROP TABLE IF EXISTS articles;
  CREATE TABLE articles
  (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    article TEXT NOT NULL,
    createdOn DATE NOT NULL,
    authorid UUID,
    categories VARCHAR(2000) NOT NULL
    )`;

  try {
    query(userquery);
  } catch (error) {
    console.log(error.message);
  }
};

const commentsTable = async () => {
  const userquery = `DROP TABLE IF EXISTS comments;
  CREATE TABLE comments
  (
    id SERIAL PRIMARY KEY,
    comment VARCHAR(128) NOT NULL,
    article VARCHAR(1048) NOT NULL,
    articleid UUID,
    createdOn DATE NOT NULL,
    authorid UUID
    )`;

  try {
    query(userquery);
  } catch (error) {
    console.log(error.message);
  }
};

const insertNewUser = async () => {
  const user = [
    'Seth',
    'Bizimana',
    'seth@gmail.com',
    Helper.securePassword('olivier'),
    'male',
    'Software engineer',
    'Kigali',
    'software developmment',
    false,
  ];
  try {
    await userModel.addNewUser(user);
  } catch (error) {
    console.log(error.message);
  }
};

userTable();
insertNewUser();
articleTable();
commentsTable();
