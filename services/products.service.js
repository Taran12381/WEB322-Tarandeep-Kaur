const { Product } = require('../models/connect');

class ProductsService {
  static async getAllProducts() {
    try {
      return await Product.findAll();
    } catch { throw new Error("Fetch failed"); }
  }

  static async getProductById(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) throw new Error("Product not found");
      return product;
    } catch { throw new Error("Fetch failed"); }
  }

  static async createProduct(productData) {
    try {
      return await Product.create(productData);
    } catch { throw new Error("Creation failed"); }
  }

  static async updateProduct(id, productData) {
    try {
      const [rowsUpdated, [updatedProduct]] = await Product.update(productData, { where: { id }, returning: true });

      if (rowsUpdated === 0) throw new Error("Product not found");

      return updatedProduct;
    } catch { throw new Error("Update failed"); }
  }

  static async deleteProductById(id) {
    try {
      const deletedProduct = await Product.destroy({ where: { id } });

      if (!deletedProduct) throw new Error("Product not found");

      return { success: true };
    } catch { throw new Error("Deletion failed"); }
  }
}

module.exports = ProductsService;
