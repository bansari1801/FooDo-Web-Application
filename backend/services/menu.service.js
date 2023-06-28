// ==========================================
//  Author: Bansari Shah
// ==========================================

const { default: mongoose } = require('mongoose');
const { menu } = require('../errors/messages');
const cuisineModel = require('../models/cuisine.model');
const menuModel = require('../models/menu.model');

exports.createMenu = async (req) => {
  const menuBody = { ...req.body, _id: new mongoose.Types.ObjectId(), restaurantId: req.restaurant.id };
  const menu = new menuModel(menuBody);
  return menu.save();
};

exports.updateMenu = async (id, reqBody) => {
  return await menuModel.findByIdAndUpdate(id, reqBody, { new: true });
};

exports.deleteMenu = async (id) => {
  return await menuModel.findByIdAndDelete(id);
};

exports.getMenu = async (id) => {
  return await menuModel.findById(id);
};

exports.getAllMenuItems = async (req, pageNo, size) => {
  let condition = {};
  condition['restaurantId'] = req.restaurant.id;
  const queryParams = req.query;

  if (queryParams.name) {
    condition['name'] = { $regex: queryParams.name, $options: 'i' };
  }

  if (queryParams.cuisine) {
    condition['cuisine'] = { $regex: queryParams.cuisine };
  }

  let query = {};
  query.skip = size * (pageNo - 1);
  query.limit = size;

  const totalDocuments = await menuModel.countDocuments(condition);

  const menuItems = await menuModel.find(condition, {}, query);

  return { totalDocuments, menuItems };
};

exports.getCusines = async (restaurantId) => {
  let condition = {};
  condition['restaurantId'] = restaurantId;
  return await cuisineModel.find(condition, { name: 1, _id: 0 });
};

exports.getMenuList = async (restaurantId) => {
  let condition = {};
  condition['restaurantId'] = restaurantId;
  return await menuModel.find(condition, { name: 1, price: 1, cuisine: 1, _id: 0 });
};

exports.getMenuItemsCount = async (restaurantId) => {
  let condition = {};

  condition["restaurantId"] = restaurantId;
  const menuItemsCount = await menuModel.count(condition);
  return menuItemsCount;
};
