const router = require('express').Router();
const { addUser } = require('../controllers/user.controller');

router.post('/new', addUser);

module.exports = router;
