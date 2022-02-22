const { schemaUser } = require('../schemas/User');
const { verifyToken } = require('../utils/jwt');
const { tokenNotFound, tokenInvalid } = require('../utils/messages');
const { badRequestCode, unauthorizedCode } = require('../utils/statusCode');

const userValidate = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  const { error } = schemaUser.validate({ displayName, email, password });

  if (error) {
    return res.status(badRequestCode).json({ message: error.message });
  }

  next();
};

const invalidToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(unauthorizedCode).json(tokenNotFound);
  }

  try {
    verifyToken(authorization);
  } catch (error) {
    return res.status(unauthorizedCode).json(tokenInvalid);
  }
  return next();
};

module.exports = {
  userValidate,
  invalidToken,
};