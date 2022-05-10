const postsRouter = require('express').Router();

const { addPost, getAllPosts } = require('../controllers/post.controller');
const { authorizeToken } = require('../helpers/auth.helper');

postsRouter.get('/', getAllPosts);
postsRouter.post('/add', authorizeToken, addPost);

module.exports = postsRouter;
