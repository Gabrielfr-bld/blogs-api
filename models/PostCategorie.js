const createPostsCategories = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostCategorie', {},
  { timestamps: false });
  
  PostsCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, 
    { as: 'category', through: PostsCategories, foreignKey: 'postId', 
  });
  };

  PostsCategories.associate = (models) => {
   models.Category.belongsToMany(models.BlogPost, {
    as: 'blogPost', through: PostsCategories, foreignKey: 'categoryId',
   });
  };

  return PostsCategories;
};
  module.exports = createPostsCategories;