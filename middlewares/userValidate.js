const { schemaUser } = require('../schemas/User');

const { badRequestCode } = require('../utils/statusCode');

const userValidate = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  const { error } = schemaUser.validate({ displayName, email, password });

  if (error) {
    return res.status(badRequestCode).json({ message: error.message });
  }

  next();
};

module.exports = {
  userValidate,
};