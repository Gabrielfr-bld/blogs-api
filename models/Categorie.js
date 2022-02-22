const createCategories = (sequelize, DataTypes) => {
    const Categories = sequelize.define('Categorie', {
      name: DataTypes.STRING, 
    });

    return Categories;
  };
  module.exports = createCategories;