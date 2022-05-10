const authRouter = require('express').Router();
const { logUser } = require('../controllers/auth.controller');

authRouter.post('/', logUser);

module.exports = authRouter;
