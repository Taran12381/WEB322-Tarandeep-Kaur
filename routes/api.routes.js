const express = require("express");
const UserService = require("../services/users.service");
const ProductService = require("../services/products.service");
const OrdersService = require("../services/orders.service");

const apiRoutes = express.Router();

module.exports = () => 
{
  apiRoutes.get("/users", async (req, res) => {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (ER) {
      console.error("error: DOES NOT ABLE TO GET USERS!", ER);
      res.status(500).json({ error: "DOES NOT ABLE TO GET USERS!" });
    }
  });

  apiRoutes.post("/users", async (req, res) => {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (ER) {
      console.error("error: DOES NOT ABLE TO ADD USER!", ER);
      res.status(500).json({ error: "DOES NOT ABLE TO ADD USER!" });
    }
  });

  apiRoutes.get("/users/:id", async (req, res) => {
    try {
      const user = await UserService.getUserByIdWithOrders(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "NO SUCH USER" });
      }
      res.json(user);
    } catch (ER) {
      console.error("error: DOES NOT ABLE TO GET USER!", ER);
      res.status(500).json({ error: "DOES NOT ABLE TO GET USER!" });
    }
  });

  apiRoutes.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await UserService.deleteUserById(id);
      res.json({ success: true });
    } catch (ER) {
      console.error("error: DOES NOT ABLE TO DELETE USER!", ER);
      res.status(500).json({ error: "DOES NOT ABLE TO DELETE USER!" });
    }
  });
  
  apiRoutes.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const userData = req.body;
    try {
      const updatedUser = await UserService.updateUser(id, userData);
      res.json(updatedUser);
    } catch (ER) {
      console.error("error: DOES NOT ABLE TO UPDATE USER!", ER);
      res.status(500).json({ error: "DOES NOT ABLE TO UPDATE USER!" });
    }
  });

  apiRoutes.get("/products", async (req, res) => {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (ER) {
      console.error("error: DOES NOT ABLE TO GET PRODUCTS!", ER);
      res.status(500).json({ error: "DOES NOT ABLE TO GET PRODUCTS!" });
    }
  });

  apiRoutes.get("/products/:id", async (req, res) => {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "NO SUCH PRODUCT" });
      }
      res.json(product);
    } catch (ER) {
      console.error("error: DOES NOT ABLE TO GET PRODUCT!", ER);
      res.status(500).json({ error: "DOES NOT ABLE TO GET PRODUCT!" });
    }
  });

  apiRoutes.delete("/products/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await ProductService.deleteProductById(id);
      res.json({ success: true });
    } catch (ER) {
      console.error("error: DOES NOT ABLE TO DELETE PRODUCT!", ER);
      res.status(500).json({ error: "DOES NOT ABLE TO DELETE PRODUCT!" });
    }
  });

  apiRoutes.post("/products", async (req, res) => {
    const newProductData = req.body;
    try {
      const newProduct = await ProductService.createProduct(newProductData);
      res.json(newProduct);
    } catch (ER) {
      console.error("error: DOES NOT ABLE TO ADD PRODCT!", ER);
      res.status(500).json({ error: "DOES NOT ABLE TO ADD PRODCT!" });
    }
  });

  apiRoutes.put("/products/:id", async (req, res) => {
    const id = req.params.id;
    const productData = req.body;
    try {
      const updatedProduct = await ProductService.updateProduct(id, productData);
      res.json(updatedProduct);
    } catch (ER) {
      console.error("error: DOES NOT ABLE TO UPDATE USER!", ER);
      res.status(500).json({ error: "DOES NOT ABLE TO UPDATE USER!" });
    }
  });

  apiRoutes.get("/orders", async (req, res) => {
    try {
      const orders = await OrdersService.getAllOrders();
      res.json(orders);
    } catch (ER) {
      console.error("error: DOES NOT ABLE TO GET ORDERS!", ER);
      res.status(500).json({ error: "DOES NOT ABLE TO GET ORDERS!" });
    }
  });

  apiRoutes.get("/orders/:id", async (req, res) => {
    try {
      const order = await OrdersService.getOrderByIdWithDetails(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "error: DOES NOT ABLE TO GET THAT ORDER!" });
      }
      res.json(order);
    } catch (ER) {
      console.error("error: DOES NOT ABLE TO GET ORDERS!", ER);
      res.status(500).json({ error: "DOES NOT ABLE TO GET ORDERS!" });
    }
  });

  apiRoutes.post("/orders", async (req, res) => {
    const newOrderData = req.body;
    try {
      const newOrder = await OrdersService.createOrder(newOrderData);
      res.json(newOrder);
    } catch (ER) {
      console.error("error: DOES NOT ABLE TO ADD ORDER!", ER);
      res.status(500).json({ error: "DOES NOT ABLE TO ADD ORDER!" });
    }
  });

  apiRoutes.put("/orders/:id", async (req, res) => {
    const id = req.params.id;
    const orderData = req.body;
    try {
      const updatedOrder = await OrdersService.updateOrder(id, orderData);
      res.json(updatedOrder);
    } catch (ER) {
      console.error("error: DOES NOT ABLE TO UPDATE ORDER!", ER);
      res.status(500).json({ error: "DOES NOT ABLE TO UPDATE ORDER!" });
    }
  });

  apiRoutes.delete("/orders/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await OrdersService.deleteOrderById(id);
      res.json({ success: true });
    } catch (ER) {
      console.error("error: DOES NOT ABLE TO DELETE ORDER!", ER);
      res.status(500).json({ error: "DOES NOT ABLE TO DELETE ORDER!" });
    }
  });

  return apiRoutes;
};