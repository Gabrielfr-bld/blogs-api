const Joi = require('joi');

const schemaBlogPost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const schemaUpdatePost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

module.exports = {
  schemaBlogPost,
  schemaUpdatePost,
};