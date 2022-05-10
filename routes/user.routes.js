const usersRouter = require('express').Router();
const { addUser, getUserById } = require('../controllers/user.controller');
const { authorizeToken } = require('../helpers/auth.helper');

usersRouter.post('/new', addUser);
usersRouter.get('/id', authorizeToken, getUserById);

module.exports = usersRouter;
