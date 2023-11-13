const express = require("express");
const users = require("../data/fakeUsers.json");
const clientSessions = require("client-sessions");
const path = require("path");
const pageRoutes = express.Router();
const AuthenticationService = require("../services/authentication.service")

pageRoutes.use(clientSessions({
  cookieName: "session", 
  secret: "WEB322",
  duration: 2 * 60 * 1000, 
  activeDuration: 1000 * 60 
}));
  
  
pageRoutes.get("/list", ensureLogin, (req, res) => {
    res.render("list", { users });
  });
  
pageRoutes.get("/detail/:id", (req, res) => {
    const user = users.find((user) => user.id == req.params.id);
    res.render("detail", { user });
  });
  
pageRoutes.get("/", (req, res) => {
    res.redirect("login");
  });
  
pageRoutes.get("/home", ensureLogin, (req, res) => {
    res.render(path.join(__dirname, "../views/index.ejs"));
  });
  
pageRoutes.get("/login", function(req, res) {
    res.render("login", { errorMsg: ""});
  });
  
  function ensureLogin(req, res, next) {
    if (!req.session.user) {
      res.redirect("/login");
    } else {
      next();
    }
  }
  
pageRoutes.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = AuthenticationService.authenticate(username, password);
  if (user) {
    req.session.user = {
      username: user.email,
    };
    console.log({ isAuthenticated : true });
    res.redirect("list");
  }
        
  else {
    res.status(401).json({ isAuthenticated : false });
      }
  });

module.exports = pageRoutes; 