const { BlogPost } = require('../models');

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

module.exports = {
  create,
};