const createPostsCategories = (sequelize, DataTypes) => {
  const PostsCategories = sequelize.define('PostCategorie', {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    categorieId: DataTypes.STRING, 
  },
  {
    timestamps: false,
  });
  
  PostsCategories.associate = (models) => {
    PostsCategories.belongsTo(models.Categories,
    { foreignKey: 'categorieId', as: 'Categorie' });
  };

  return PostsCategories;
  };
  module.exports = createPostsCategories;