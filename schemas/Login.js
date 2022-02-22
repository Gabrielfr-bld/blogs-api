const Joi = require('joi');
const { password } = require('../utils/messages');

const PASSWORD_MIN = 6;

const schemaLogin = Joi.object({
  email: Joi.string().email().empty().required(),
  password: Joi.string().empty().min(PASSWORD_MIN).message(password)
  .required(),
});

module.exports = {
  schemaLogin,
};