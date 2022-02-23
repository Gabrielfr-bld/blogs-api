const { schemaBlogPost } = require('../schemas/BlogPost');
const { badRequestCode } = require('../utils/statusCode');

const blogPostValidate = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  const { error } = schemaBlogPost.validate({ title, content, categoryIds });

  if (error) {
    return res.status(badRequestCode).json({ message: error.message });
  }

  next();
};

module.exports = {
  blogPostValidate,
};