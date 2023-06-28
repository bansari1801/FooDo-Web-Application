// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

const express = require("express");
const {
  registerRestaurant,
  updateRestaurant,
  getRestaurant,
} = require("../controllers/restaurant.controller");
const { verifyOwner } = require("../middlewares/auth.middleware");

const userManagementRouter = express.Router();

userManagementRouter.post("/register", registerRestaurant);

userManagementRouter.put(
  "/update/:restaurantId",
  verifyOwner,
  updateRestaurant
);
userManagementRouter.get("/:restaurantId", verifyOwner, getRestaurant);

module.exports = userManagementRouter;
