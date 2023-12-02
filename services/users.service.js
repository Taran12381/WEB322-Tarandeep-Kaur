const { User, Order } = require('../models/connect');

class UsersService {
  static async getAllUsers() {
    try {
      return await User.findAll();
    } catch { throw new Error("Fetch failed"); }
  }

  static async getUserByIdWithOrders(id) {
    try {
      const user = await User.findByPk(id, { include: [Order] });
      if (!user) throw new Error("User not found");
      return user;
    } catch { throw new Error("Fetch failed"); }
  }

  static async createUser(userData) {
    try {
      return await User.create(userData);
    } catch { throw new Error("Creation failed"); }
  }

  static async updateUser(id, userData) {
    try {
      const [rows, [userUpdate]] = await User.update(userData, { where: { id }, returning: true });

      if (rows === 0) throw new Error("User not found");

      return userUpdate;
    } catch { throw new Error("Update failed"); }
  }

  static async deleteUserById(id) {
    try {
      const deletedUser = await User.destroy({ where: { id } });

      if (!deletedUser) throw new Error("User not found");

      return { success: true };
    } catch { throw new Error("Deletion failed"); }
  }
}

module.exports = UsersService;
