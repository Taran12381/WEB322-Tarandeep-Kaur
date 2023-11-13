const express = require("express");
const UserService = require("../services/users.service")
const productService = require("../services/products.service")
const clientSessions = require("client-sessions");
const apiRoutes = express.Router();

apiRoutes.get("/users", ensureLogin, (req, res) => {
    res.json(UserService.findAll());
  });
  
apiRoutes.get("/users/:id", ensureLogin, (req, res) => {
    const user = UserService.findById(req.params.id);
    
    if (user) {
      res.json(user);
    } 
    else {
      res.status(404).json({ error: "USER NOT FOUND" });
    }
  });


apiRoutes.delete('/users/:id', ensureLogin, (req, res) => {
  const userId = req.params.id;
  const user = UserService.findById(userId);

  if (user) {
    res.json({ success: true, message: "Deleted Successfully" });
  } else {
    res.status(404).json({ error: "USER NOT FOUND" });
  }
});

apiRoutes.post('/users', ensureLogin, (req, res) => {
  const newUser = req.body;
  const userAdded = UserService.add(newUser);
  res.json(userAdded);
});




apiRoutes.get("/products", ensureLogin, (req, res) => {
    res.json(productService.findAll());
  });
  
apiRoutes.get("/products/:id", ensureLogin, (req, res) => {
    const product = productService.findById(req.params.id);
    if (product) {
      res.json(product);
    } 
    else {
      res.status(404).json({ error: "PRODUCT NOT FOUND" });
    }
  });

apiRoutes.delete('/products/:id', ensureLogin, (req, res) => {
    const productId = req.params.id;
    const product = productService.findById(productId);
  
    if (product) {
      res.json({ success: true, message: "Deleted Successfully" });
    } else {
      res.status(404).json({ error: "PRODUCT NOT FOUND" });
    }
  });
  
  apiRoutes.post('/products', ensureLogin, (req, res) => {
    const newProduct = req.body;
    const createdProduct = productService.addProduct(newProduct);
    res.json(createdProduct);
  });




  function ensureLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
}

  module.exports = apiRoutes;