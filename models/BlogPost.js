const createBlogPosts = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
  }, 
  { 
    timestamps: false,
    createdAt: 'published',
    updatedAt: 'updated', 
  });
    
    BlogPosts.associate = (models) => {
      BlogPosts.belongsTo(models.User, {
        foreignKey: 'userId', as: 'User',
      });
    };
    return BlogPosts;
  };
  module.exports = createBlogPosts;