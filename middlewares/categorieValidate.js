const { schemaCategory } = require('../schemas/Category');
const { badRequestCode } = require('../utils/statusCode');

const categorieValidate = (req, res, next) => {
  const { name } = req.body;

  const { error } = schemaCategory.validate({ name });

  if (error) {
    return res.status(badRequestCode).json({ message: error.message });
  }

  next();
};

module.exports = {
  categorieValidate,
};