const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const { dbConexion } = require('./config/db.config');

const usersRouter = require('./routes/user.routes');
const authRouter = require('./routes/auth.routes');
const postsRouter = require('./routes/post.routes');
const commentRouter = require('./routes/comment.routes');

const app = express();
/** DB connection */
dbConexion();

/** Middlewares */
// Security
app.use(cors());
// Request information from server
app.use(morgan('dev'));
// read and Parse body request (from POST and PUT request)
app.use(express.json());
// public directory, page in server
app.use(express.static('public'));
/** Server Up */

/* --- ROUTES ---- */

app.use('/user', usersRouter);
app.use('/auth', authRouter);
app.use('/post', postsRouter);
app.use('/comment', commentRouter);

app.listen(process.env.port, () => {
  console.log(`Server up in port: ${process.env.PORT}`);
});
