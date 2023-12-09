const express = require("express");
const UserService = require("../services/users.service");
const ProductService = require("../services/products.service");
const clientSessions = require("client-sessions");
const path = require("path");
const pageRoutes = express.Router();

const AuthenticationService = require("../services/authentication.service")

pageRoutes.use(clientSessions({
    cookieName: "loginSession", 
    secret: "assignment5",
    duration: 3 * 60 * 1000, 
    activeDuration: 1000 * 60 
  }
  ));
  
  
  function loginCheck(req, res, next) {
    if (!req.loginSession.user) {
      return res.redirect("/login");
    }
    next();
  }

  
  
pageRoutes.get("/users", loginCheck, async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.render("users", { users });
  } catch (ER) {
    console.error("error: DOES NOT ABLE TO GET USERS!", ER);
    res.status(500).json({ error: "DOES NOT ABLE TO GET USERS!" });
  }
});
  
pageRoutes.get("/users/:id", loginCheck, async (req, res) => {
  try {
    const user = await UserService.getUserByIdWithOrders(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "NO SUCH USER" });
    }
    res.render("user", { user });
  } catch (ER) {
    console.error("error: DOES NOT ABLE TO GET USER!", ER);
    res.status(500).json({ error: "DOES NOT ABLE TO GET USER!" });
  }
});

pageRoutes.get("/products", loginCheck, async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    res.render("products", { products });
  } catch (ER) {
    console.error("error: DOES NOT ABLE TO GET PRODUCTS!", ER);
    res.status(500).json({ error: "DOES NOT ABLE TO GET PRODUCTS!" });
  }
});

pageRoutes.get("/products/:id", loginCheck, async (req, res) => {
  try {
    const product = await ProductService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "NO SUCH PRODUCT" });
    }
    res.render("product", { product });
  } catch (ER) {
    console.error("error: DOES NOT ABLE TO GET PRODUCT!", ER);
    res.status(500).json({ error: "DOES NOT ABLE TO GET PRODUCT!" });
  }
});
  
pageRoutes.get("/", (req, res) => {
    res.redirect("login");
  });
  
pageRoutes.get("/home", loginCheck, (req, res) => {
    res.render(path.join(__dirname, "../views/index.ejs"));
  });
  
pageRoutes.get("/login", function(req, res) {
    res.render("login", { errorMsg: ""});
  });
  
  
pageRoutes.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = AuthenticationService.authenticate(username, password);
  if (user) {
    req.loginSession.user = {
      username: user.email,
    };
    res.redirect("users");
  }
        
  else {
      res.render("login", { errorMsg: "INVALID USER!"});
      }
  });

module.exports = pageRoutes; 