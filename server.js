const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const clientSessions = require("client-sessions");
const pageRoutes = require("./routes/pages.routes");
const apiRoutes = require("./routes/api.routes");
const { Sequelize } = require("sequelize");
const bodyParser = require("body-parser");
const { Order, User, Product } = require("./models/connect");

const sequelize = new Sequelize('SenecaDB', 'Taran12381', '19CjWvGuZYOo', {
  host: 'ep-holy-forest-41421455-pooler.us-east-2.aws.neon.tech',
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
});

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
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
app.use(bodyParser.json());

app.use("/", pageRoutes);
app.use("/api", apiRoutes({ Order, User, Product }));

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database successfully.");
    await sequelize.sync();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to start the server:", error);
    process.exit(1);
  }
})();
