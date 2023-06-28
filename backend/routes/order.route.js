// ==========================================
//  Author: Meet Master
// ==========================================

const express = require("express");
const {
  addOrder,
  updateOrder,
  getOrder,
  getAllOrders,
  getActiveOrdersCount,
} = require("../controllers/order.controller");
const { verifyOwner, verifyChef } = require("../middlewares/auth.middleware");

const orderRouter = express.Router();

orderRouter.post("/", verifyOwner, addOrder);
orderRouter.get("/chef", verifyChef, getAllOrders);
orderRouter.get("/", verifyOwner, getAllOrders);
orderRouter.get("/:id", verifyOwner, getOrder);
orderRouter.put("/chef/:id", verifyChef, updateOrder);
orderRouter.put("/:id", verifyOwner, updateOrder);
orderRouter.put("/:id", verifyOwner, updateOrder);



module.exports = orderRouter;
