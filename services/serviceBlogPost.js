const { BlogPost, User, Category } = require('../models');
const { decodeToken } = require('../utils/jwt');
const { unauthorizedUser, postNotExist } = require('../utils/messages');
const { unauthorizedCode, notFoundCode } = require('../utils/statusCode');

const create = async ({ title, content, userId }) => {
  const postCreate = await BlogPost.create({
    title,
    content, 
    userId,
    published: new Date(),
    updated: new Date(),
  });

  return postCreate.dataValues;
};

const getAll = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
  });

  return allPosts;
};

const getById = async ({ id }) => {
  const post = BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
  });

  return post;
};

const update = async ({ id, title, content, updated }) => {
  await BlogPost.update({ title, content, updated }, { where: { id } });

  const updatedPost = await BlogPost.findByPk(id, {
    attributes: {
      exclude: ['published', 'updated'],
    },
    include: {
      model: Category,
      as: 'categories',
    },
  }); 

  return updatedPost;
};

const authUser = async ({ authorization, userId }) => {
  const decode = decodeToken(authorization);

  const { id, email } = await User.findByPk(userId);

  if (decode.userId !== id && decode.email !== email) {
    return { status: unauthorizedCode, message: unauthorizedUser };
  }

  return id;
};

const deletePost = async ({ id, authorization }) => {
  const idPost = await getById({ id });

  if (!idPost) return { status: notFoundCode, message: postNotExist };

  const auth = await authUser({
    authorization,
    userId: idPost.userId,
  });
  if (auth.status) {
    return { status: auth.status, message: auth.message };
  }

  await BlogPost.destroy({ where: { id } });

  return true;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deletePost,
};