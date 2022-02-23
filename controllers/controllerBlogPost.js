const serviceBlogPost = require('../services/serviceBlogPost');
const serviceCategory = require('../services/serviceCategory');
const serviceUser = require('../services/serviceUser');
const { decodeToken } = require('../utils/jwt');
const { idCategoryNotFoun, postNotExist, unauthorizedUser } = require('../utils/messages');
const { 
  badRequestCode, 
  createdCode, 
  okCode, 
  notFoundCode, 
  unauthorizedCode,
  noContentCode, 
} = require('../utils/statusCode');

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

const update = async (req, res, next) => {
  try {
    const { id: idP } = req.params;
    const { title, content } = req.body;
    const { authorization } = req.headers;

    const idPost = await serviceBlogPost.getById({ id: idP });

    if (!idPost) {
      return res.status(notFoundCode).json(postNotExist);
    }

    const decode = decodeToken(authorization);

    const { dataValues: { id, email } } = await serviceUser.getById({ id: idPost.userId });

    if (decode.userId !== id && decode.email !== email) {
      return res.status(unauthorizedCode).json(unauthorizedUser);
    }

    const postUpdate = await serviceBlogPost.update({ id, title, content, updated: new Date() });

    return res.status(okCode).json(postUpdate);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;

    const delPost = await serviceBlogPost.deletePost({ id, authorization });

    if (delPost.status) {
      return res.status(delPost.status).json(delPost.message);
    }

    return res.status(noContentCode).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deletePost,
};