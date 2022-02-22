const { schemaLogin } = require('../schemas/Login');
const { badRequestCode } = require('../utils/statusCode');

const loginValidate = (req, res, next) => {
  const login = req.body;
  const { error } = schemaLogin.validate(login);

  if (error) {
    return res.status(badRequestCode).json({ message: error.message });
  }

  next();
};

module.exports = {
  loginValidate,
};