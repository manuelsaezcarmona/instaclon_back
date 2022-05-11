const commentRouter = require('express').Router();

const { authorizeToken } = require('../helpers/auth.helper');
const {
  addComment,
  deleteComment,
  getCommentsByPost,
} = require('../controllers/comment.controller');

commentRouter.post('/add', authorizeToken, addComment);
commentRouter.delete('/delete/:commentid', authorizeToken, deleteComment);
commentRouter.get('/', authorizeToken, getCommentsByPost);

module.exports = commentRouter;
