const postsRouter = require('express').Router();

const {
  addPost,
  getAllPosts,
  deletePost,
} = require('../controllers/post.controller');
const { authorizeToken } = require('../helpers/auth.helper');

postsRouter.get('/', getAllPosts);
postsRouter.post('/add', authorizeToken, addPost);
postsRouter.delete('/delete/:postid', authorizeToken, deletePost);

module.exports = postsRouter;
