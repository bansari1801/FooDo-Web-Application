// ==========================================
//  Author: Bansari Shah, Khushalkumar Gondaliya, Meet Master, Karansinh Rathore
// ==========================================

const authRouter = require("./auth.route");
const menuRouter = require("./menu.route");
const orderRouter = require("./order.route");
const staffRouter = require("./staff.route");
const restaurantRouter = require("./restaurant.route");
const { verifyChef } = require("../middlewares/auth.middleware");
const dashboardRouter = require("./dashboard.route");

module.exports = (app) => {
  app.use("/menu", menuRouter);

  app.use("/menu", menuRouter);
  app.use("/staff", staffRouter);

  app.use("/restaurant", restaurantRouter);

  app.use("/", authRouter);

  app.use("/order", orderRouter);

  app.get("/chef", verifyChef, (req, res) => {
    console.log(req.restaurant);

  })

  app.use("/dashboard", dashboardRouter);

  // Other Routes

  app.get("/*", function (req, res) {
    res.status(200).send({ message: "Page Not Found" });
  });

  app.post("/*", function (req, res) {
    res.status(404).send({ message: "Page Not Found" });
  });

  app.put("/*", function (req, res) {
    res.status(404).send({ message: "Page Not Found" });
  });
};
