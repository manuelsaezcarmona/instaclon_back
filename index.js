const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');

const app = express();

/** Middlewares */

/** Server Up */
app.listen(process.env.port, () => {
  console.log(`Server up in port: ${process.env.PORT}`);
});
