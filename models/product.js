const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Product.associate = (models) => {
    Product.hasMany(models.Order, {
      foreignKey: 'ProductId',
      onDelete: 'CASCADE',
      as: 'orders', // Bonus: Alias for the orders relationship
    });
  };

  Product.beforeValidate((product, options) => {
    if (product.price) {
      product.price = parseFloat(product.price);
    }
  });

  return Product;
};
