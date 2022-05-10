const usersRouter = require('express').Router();
const {
  addUser,
  getUserById,
  updateUser,
} = require('../controllers/user.controller');
const { authorizeToken } = require('../helpers/auth.helper');

usersRouter.post('/new', addUser);
usersRouter.get('/id', authorizeToken, getUserById);
usersRouter.patch('/', authorizeToken, updateUser);

module.exports = usersRouter;
