const serviceUser = require('../services/serviceUser');
const { createToken } = require('../utils/jwt');
const { loginInvalid } = require('../utils/messages');
const { badRequestCode, okCode } = require('../utils/statusCode');

const login = async (req, res, next) => {
  const { email } = req.body;

  try {
    const receiveEmail = await serviceUser.emailExists({ email });

    if (!receiveEmail) {
      return res.status(badRequestCode).json(loginInvalid);
    }
    const { id } = receiveEmail.dataValues;

    const token = createToken({ userId: id, email });

    return res.status(okCode).json({ token });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
};