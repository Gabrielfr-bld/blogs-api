const serviceUser = require('../services/serviceUser');
const { createToken } = require('../utils/jwt');
const { createdCode, conflictCode, okCode, notFoundCode } = require('../utils/statusCode');
const { userRegister, userNotExist } = require('../utils/messages');

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

const getAll = async (_req, res, next) => {
  try {
    const allUsers = await serviceUser.getAll();

    return res.status(okCode).json(allUsers);
  } catch (error) {
    return next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await serviceUser.getById({ id });

    if (!user) {
      return res.status(notFoundCode).json(userNotExist);
    }

    return res.status(okCode).json(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
};