const serviceBlogPost = require('../services/serviceBlogPost');
const serviceCategory = require('../services/serviceCategory');
const { decodeToken } = require('../utils/jwt');
const { idCategoryNotFoun } = require('../utils/messages');
const { badRequestCode, createdCode } = require('../utils/statusCode');

const create = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { title, content, categoryIds } = req.body;

    const noExist = await serviceCategory.categoryFound(categoryIds);

    if (noExist) {
      return res.status(badRequestCode).json(idCategoryNotFoun);
    }

    const { userId } = decodeToken(authorization);

    const { id } = await serviceBlogPost.create({ title, content, userId });

    return res.status(createdCode).json({
      id,
      userId,
      title,
      content,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};