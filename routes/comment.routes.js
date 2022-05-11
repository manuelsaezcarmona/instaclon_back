const commentRouter = require('express').Router();

const { authorizeToken } = require('../helpers/auth.helper');
const { addComment } = require('../controllers/comment.controller');

commentRouter.post('/add', authorizeToken, addComment);

module.exports = commentRouter;
