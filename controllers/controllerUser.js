const serviceUser = require('../services/serviceUser');
const { createToken } = require('../utils/jwt');
const { createdCode, conflictCode } = require('../utils/statusCode');
const { userRegister } = require('../utils/messages');

const create = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    
    const receiveEmail = await serviceUser.emailExists({ email });

    if (receiveEmail) {
      return res.status(conflictCode).json(userRegister);
    }

    const { id } = await serviceUser.create({
      displayName,
      email,
      password,
      image,
    });

    const token = createToken({ userId: id, displayName, email });

    return res.status(createdCode).json({ token });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
};