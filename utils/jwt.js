require('dotenv').config();

const jwt = require('jsonwebtoken');

 const createToken = (details) => {
  const config = {
    algorithm: 'HS256',
    expiresIn: '4d',
  };

  const token = jwt.sign(details, process.env.JWT_SECRET, config);

  return token;
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  return payload;
};

module.exports = {
  createToken,
  verifyToken,
};