const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const pageRoutes = require("./routes/pages.routes");
const apiRoutes = require("./routes/api.routes");

const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(expressLayouts);
app.use(express.static("public"));
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use(pageRoutes);

app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});