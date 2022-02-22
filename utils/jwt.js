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

module.exports = {
  createToken,
};