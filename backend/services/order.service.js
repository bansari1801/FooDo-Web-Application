// ==========================================
//  Author: Meet Master
// ==========================================

const { default: mongoose } = require("mongoose");
const { order } = require("../errors/messages");
const orderModel = require("../models/order.model");

exports.createOrder = (req) => {
  const orderBody = {
    ...req.body,
    _id: new mongoose.Types.ObjectId(),
    restaurantId: req.restaurant.id,
  };
  const order = new orderModel(orderBody);
  return order.save();
};

exports.updateOrderById = async (id, reqBody) => {
  return await orderModel.updateOne(
    { _id: id },
    { $set: reqBody },
    { runValidators: true, new: true }
  );
};

exports.getOrderById = (id) => {
  return orderModel.findById(id).exec();
};

exports.getAllOrders = async (req, pageNo, size) => {
  let condition = {};

  const queryParams = req.query;

  if (queryParams.searchOrders) {
    condition = {
      $or: [
        { customerName: { $regex: queryParams.searchOrders, $options: "i" } },
        { phoneNumber: { $regex: queryParams.searchOrders, $options: "i" } },
      ],
    };
  }

  if (queryParams.status) {
    if(req.restaurant.role === 'Chef'){
      condition['preparationStatus'] = { $regex: queryParams.status };
      condition['status'] = { $regex: "completed" };
    }else {
      condition['status'] = { $regex: queryParams.status };
    }
   
  }

  condition["restaurantId"] = req.restaurant.id;

  let query = {};
  query.skip = size * (pageNo - 1);
  query.limit = size;
  const totalNumberOfOrders = await orderModel.countDocuments(condition);
  const orders = await orderModel.find(condition, {}, query);
  return { totalNumberOfOrders, orders };
};

exports.getActiveOrderCount = async (restaurantId) => {
  let condition = {};

  condition['status'] = 'active';

  condition["restaurantId"] = restaurantId;
  const activeOrdersCount = await orderModel.count(condition);
  return activeOrdersCount;
};
