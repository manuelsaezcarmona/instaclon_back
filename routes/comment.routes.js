const commentRouter = require('express').Router();

const { authorizeToken } = require('../helpers/auth.helper');
const {
  addComment,
  deleteComment,
} = require('../controllers/comment.controller');

commentRouter.post('/add', authorizeToken, addComment);
commentRouter.delete('/delete/:commentid', authorizeToken, deleteComment);

module.exports = commentRouter;
