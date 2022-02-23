const { Category } = require('../models');

const create = async ({ name }) => {
    const categoryCreate = await Category.create({ 
      name,
    });
  
    return categoryCreate.dataValues;
  };

const getAll = async () => {
  const allCategories = await Category.findAll();
  
  return allCategories;
};

const categoryFound = async (categoryIds) => {
  const category = await Promise.all( 
    categoryIds.map(async (id) => {
      const find = await Category.findOne({ where: { id } });
      return find;
    }),
  );

  return category.some((n) => !n);
};

  module.exports = {
    create,
    getAll,
    categoryFound,
  };
