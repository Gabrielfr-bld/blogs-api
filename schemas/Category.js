const Joi = require('joi');

const schemaCategory = Joi.object({ 
  name: Joi.string().empty().required(),
});

module.exports = {
  schemaCategory,
};