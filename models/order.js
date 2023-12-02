const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Order = sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE',
      as: 'user', // Bonus: Alias for the user relationship
    });

    Order.belongsTo(models.Product, {
      foreignKey: 'ProductId',
      onDelete: 'CASCADE',
      as: 'product', // Bonus: Alias for the product relationship
    });
  };

  return Order;
};
