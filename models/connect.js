const { Sequelize } = require("sequelize");
const createOrderModel = require("./order");
const createUserModel = require("./user");
const createProductModel = require("./product");

const sequelize = new Sequelize({
  database: 'SenecaDB',
  username: 'Taran12381',
  password: '19CjWvGuZYOo',
  host: 'ep-holy-forest-41421455-pooler.us-east-2.aws.neon.tech',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
});

const Order = createOrderModel(sequelize);
const User = createUserModel(sequelize);
const Product = createProductModel(sequelize);

// Define associations
User.hasMany(Order);
Order.belongsTo(User);

Product.hasMany(Order);
Order.belongsTo(Product);

// Sync database
(async () => {
  try {
    await sequelize.sync();
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
})();

module.exports = { Order, User, Product };
