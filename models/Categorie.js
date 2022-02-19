const createCategories = (sequelize, DataTypes) => {
    const Categories = sequelize.define('Categorie', {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      name: DataTypes.STRING, 
    });

    Categories.associate = (models) => {
      Categories.hasOne(models.PostsCategories,
      { foreignKey: 'categorieId', as: 'PostCategorie' });
    };

    return Categories;
  };
  module.exports = createCategories;