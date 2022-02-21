const { internalError } = require('../utils/messages');
const { internalErrorCode } = require('../utils/statusCode');

const errorMiddleware = (err, _req, res, _next) => {
  console.log(err.message);

  return res.status(internalErrorCode).json(internalError);
};

module.exports = {
  errorMiddleware,
};