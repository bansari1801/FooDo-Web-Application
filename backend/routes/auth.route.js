// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

const express = require("express");
const { login, logout } = require("../controllers/auth.controller");
const { registerRestaurant } = require("../controllers/restaurant.controller");
const { verifyToken, verifyOwner } = require("../middlewares/auth.middleware");

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.get("/logout", verifyOwner, logout);

module.exports = authRouter;
