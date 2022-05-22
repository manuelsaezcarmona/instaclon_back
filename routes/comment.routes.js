const commentRouter = require('express').Router();

const { authorizeToken } = require('../helpers/auth.helper');
const {
  addComment,
  deleteComment,
  getCommentsByPost,
  updateComment,
  getCommentById,
} = require('../controllers/comment.controller');

commentRouter.post('/add', authorizeToken, addComment);
commentRouter.delete('/delete/:commentid', authorizeToken, deleteComment);
commentRouter.get('/:postID', authorizeToken, getCommentsByPost);
commentRouter.patch('/update/:commentid', authorizeToken, updateComment);
commentRouter.get('/id/:commentID', authorizeToken, getCommentById);
module.exports = commentRouter;
