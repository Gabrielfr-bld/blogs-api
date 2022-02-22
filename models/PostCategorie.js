const createPostsCategories = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostCategorie', {},
  { timestamps: false });
  
  PostsCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, 
    { as: 'categorie', through: PostsCategories, foreignKey: 'postId', 
  });
  };

  PostsCategories.associate = (models) => {
   models.Categorie.belongsToMany(models.BlogPost, {
    as: 'blogPost', through: PostsCategories, foreignKey: 'categoryId',
   });
  };

  return PostsCategories;
};
  module.exports = createPostsCategories;