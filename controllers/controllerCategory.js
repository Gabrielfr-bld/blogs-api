const serviceCategorie = require('../services/serviceCategory');
const { createdCode } = require('../utils/statusCode');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const createCategorie = await serviceCategorie.create({ name });  

    return res.status(createdCode).json(createCategorie);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};