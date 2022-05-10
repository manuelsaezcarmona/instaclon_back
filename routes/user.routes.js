const usersRouter = require('express').Router();
const { addUser, getUserById } = require('../controllers/user.controller');

usersRouter.post('/new', addUser);
usersRouter.get('/:id', getUserById);

module.exports = usersRouter;
