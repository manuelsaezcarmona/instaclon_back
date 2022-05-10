const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const createJWT = (id, username) => {
  const jwToken = jwt.sign({ id, username }, process.env.SECRET_JWT_SEED);
  return jwToken;
};

module.exports = { createJWT };
