const { schemaBlogPost, schemaUpdatePost } = require('../schemas/BlogPost');
const { canNotEdited } = require('../utils/messages');
const { badRequestCode } = require('../utils/statusCode');

const blogPostValidate = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  const { error } = schemaBlogPost.validate({ title, content, categoryIds });

  if (error) {
    return res.status(badRequestCode).json({ message: error.message });
  }

  next();
};

const blogPostUpdateValidate = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (categoryIds) {
    return res.status(badRequestCode).json(canNotEdited);
  }

  const { error } = schemaUpdatePost.validate({ title, content });

  if (error) {
    return res.status(badRequestCode).json({ message: error.message });
  }

  next();
};

module.exports = {
  blogPostValidate,
  blogPostUpdateValidate,
};