const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const createJWT = (id, username) => {
  const jwToken = jwt.sign({ id, username }, process.env.SECRET_JWT_SEED);
  return jwToken;
};

const authorizeToken = (req, res, next) => {
  const authorization = req.header('Authorization');
  let token = '';

  if (!authorization) {
    res.status(401).send({ message: 'Access denied' });
  }
  try {
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7);
      const verified = jwt.verify(token, process.env.SECRET_JWT_SEED);
      console.log(verified);
      req.user = verified;
    }
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};
module.exports = { createJWT, authorizeToken };
