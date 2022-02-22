const { User } = require('../models');

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

module.exports = {
  create,
  emailExists,
  getAll,
  getById,
};