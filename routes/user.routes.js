const usersRouter = require('express').Router();
const { addUser } = require('../controllers/user.controller');

usersRouter.post('/new', addUser);

module.exports = usersRouter;
