const { Category } = require('../models');

const create = async ({ name }) => {
    const categoryCreate = await Category.create({ 
      name,
    });
  
    return categoryCreate.dataValues;
  };

  module.exports = {
    create,
  };
