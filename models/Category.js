const createCategories = (sequelize, DataTypes) => {
    const Categories = sequelize.define('Category', {
      name: DataTypes.STRING, 
    }, 
    { 
      timestamps: false, 
    });
  
    return Categories;
  };
  module.exports = createCategories;