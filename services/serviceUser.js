const { User } = require('../models');
const { decodeToken } = require('../utils/jwt');

const create = async ({ displayName, email, password, image }) => {
  const userCreate = await User.create({ 
    displayName,
    email,
    password,
    image, 
  });

  return userCreate.dataValues;
};

const emailExists = async ({ email }) => {
  const receivedEmail = await User.findOne({ where: { email } });

  return receivedEmail;
};

const getAll = async () => {
  const allUsers = await User.findAll();

  return allUsers;
};

const getById = async ({ id }) => {
  const user = await User.findByPk(id);

  return user;
};

const deleteUser = async ({ authorization }) => {
  const { userId, email } = decodeToken(authorization);

  await User.destroy({ where: { id: userId, email } });

  return true;
};

module.exports = {
  create,
  emailExists,
  getAll,
  getById,
  deleteUser,
};