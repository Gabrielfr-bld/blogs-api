const { BlogPost, User, Category } = require('../models');

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

module.exports = {
  create,
  getAll,
  getById,
};