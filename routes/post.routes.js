const postsRouter = require('express').Router();

const { addPost } = require('../controllers/post.controller');
const { authorizeToken } = require('../helpers/auth.helper');

postsRouter.post('/add', authorizeToken, addPost);

module.exports = postsRouter;
