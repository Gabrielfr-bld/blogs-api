const serviceBlogPost = require('../services/serviceBlogPost');
const serviceCategory = require('../services/serviceCategory');
const { decodeToken } = require('../utils/jwt');
const { idCategoryNotFoun, postNotExist } = require('../utils/messages');
const { badRequestCode, createdCode, okCode, notFoundCode } = require('../utils/statusCode');

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

const getAll = async (_req, res, next) => {
  try {
    const allPosts = await serviceBlogPost.getAll();

    return res.status(okCode).json(allPosts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
  const { id } = req.params;

  const post = await serviceBlogPost.getById({ id });
  if (!post) {
    return res.status(notFoundCode).json(postNotExist);
  }

  return res.status(okCode).json(post); 
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
};