const { Order, User, Product } = require('../models/connect');

class OrdersService {

  static async getAllOrders() {
    try {
      return await Order.findAll();
    } catch { throw new Error("Fetch failed"); }
  }

  static async getOrderByIdWithDetails(id) {
    try {
      const order = await Order.findByPk(id, { include: [User, Product] });

      if (!order) throw new Error("Order not found");

      return order;
    } catch { throw new Error("Fetch failed"); }
  }

  static async createOrder(orderData) {
    try {
      return await Order.create(orderData);
    } catch { throw new Error("Creation failed"); }
  }

  static async updateOrder(id, orderData) {
    try {
      const [rowsUpdated, [updatedOrder]] = await Order.update(orderData, { where: { id }, returning: true });

      if (rowsUpdated === 0) throw new Error("Order not found");

      return updatedOrder;
    } catch { throw new Error("Update failed"); }
  }

  static async deleteOrderById(id) {
    try {
      const deletedOrder = await Order.destroy({ where: { id } });

      if (!deletedOrder) throw new Error("Order not found");

      return { success: true };
    } catch { throw new Error("Deletion failed"); }
  }
}

module.exports = OrdersService;
