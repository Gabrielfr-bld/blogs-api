const serviceCategory = require('../services/serviceCategory');
const { createdCode, okCode } = require('../utils/statusCode');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const createCategorie = await serviceCategory.create({ name });  

    return res.status(createdCode).json(createCategorie);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const allCategories = await serviceCategory.getAll();
    
    return res.status(okCode).json(allCategories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
};