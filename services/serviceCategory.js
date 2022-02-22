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

  module.exports = {
    create,
    getAll,
  };
