module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostCategorie', {},
  { timestamps: false });
  
  PostsCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, 
    { as: 'category', through: PostsCategory, foreignKey: 'postId', 
  });
  };

  PostsCategory.associate = (models) => {
   models.Category.belongsToMany(models.BlogPost, {
    as: 'blogPost', through: PostsCategory, foreignKey: 'categoryId',
   });
  };

  return PostsCategory;
};