const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const { dbConexion } = require('./config/db.config');

const app = express();
/** DB connection */
dbConexion();

/** Middlewares */
// public directory, page in server
app.use(express.static('public'));
/** Server Up */
app.listen(process.env.port, () => {
  console.log(`Server up in port: ${process.env.PORT}`);
});
