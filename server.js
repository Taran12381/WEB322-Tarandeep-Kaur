const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const clientSessions = require("client-sessions");
const path = require("path");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use(clientSessions({
  cookieName: "session", 
  secret: "WEB322",
  duration: 2 * 60 * 1000, 
  activeDuration: 1000 * 60 
}));

app.use(express.static("public"));

const port = 3000;
const users = require("./data/fakeUsers.json");

app.get("/", (req, res) => {
  res.redirect("login");
});

app.get("/home", ensureLogin, (req, res) => {
  res.render(path.join(__dirname, "views/index.ejs"));
});

app.get("/list", ensureLogin, (req, res) => {
  res.render("list", { users });
});

app.get("/detail/:id", ensureLogin, (req, res) => {
  const user = users.find((user) => user.id == req.params.id);
  res.render("detail", { user });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


const user = {
  username: "username",
  password: "password",
};

app.get("/login", function(req, res) {
  res.render("login", { errorMsg: "........................."});
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if(username === "" || password === "") {
     
      return res.render("login", { errorMsg: "Missing credentials."});
    }
    if(username === user.username && password === user.password){
      req.session.user = {
        username: user.username,
      };
      res.redirect("list");
    }
    else {
     
      res.render("login", { errorMsg: "Invalid username or password!"});
    }
});

function ensureLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
}