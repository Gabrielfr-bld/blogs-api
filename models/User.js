const createUsers = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primarykey: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });

  Users.associate = (models) => {
    Users.hasMany(models.BlogPost,
    { foreignKey: 'userId', as: 'BlogPost' });
  };

  return Users;
};
module.exports = createUsers;