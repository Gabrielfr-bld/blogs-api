const Joi = require('joi');
const { password } = require('../utils/messages');

const DISPLAY_NAME_MIN = 8;
const PASSWORD_MIN = 6;

const schemaUser = Joi.object({
    displayName: Joi.string().min(DISPLAY_NAME_MIN).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(PASSWORD_MIN).message(password).required(),
});

module.exports = {
  schemaUser,
};