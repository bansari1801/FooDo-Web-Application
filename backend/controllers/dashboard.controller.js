// ==========================================
//  Author: Bansari Shah,Khushalkumar Gondaliya
// ==========================================

const dashboardService = require('../services/dashboard.service');
const errorMsg = require('../errors/messages').dashboard;
const { getWeeklySales } = require("../services/dashboard.service");
const { getMenuItemsCount } = require('../services/menu.service');
const errorHandler = require('../errors/error.handler');
const { getActiveOrderCount } = require('../services/order.service');

exports.countCuisineWiseSales = async (req, res) => {
  try {
    const data = await dashboardService.getCuisineWiseSalesData(req);
    let responseData = {};
    responseData.meta = errorMsg.salesDataForCuisine;
    responseData.data = data;
    res.status(errorMsg.salesDataForCuisine.code).send(responseData);
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};

exports.countItemWiseSales = async (req, res) => {
  try {
    const data = await dashboardService.getMenuItemWiseSalesData(req);
    let responseData = {};
    responseData.meta = errorMsg.salesDataForMenuItems;
    responseData.data = data;
    res.status(errorMsg.salesDataForMenuItems.code).send(responseData);
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};

exports.getWeeklySales = async (req, res) => {
  try {
    const restaurant = req.restaurant;

    const output = await getWeeklySales(restaurant.id);
    let responseData = {};
    responseData.meta = {
      message: "Data returned successfully",
      status: "success",
    };

    responseData.data = output;
    return res.status(200).json(responseData);
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};

exports.getCounts = async (req, res) => {
    try {
      const activeOrdersCount = await getActiveOrderCount(req.restaurant.id);
      const menuItemsCount = await getMenuItemsCount(req.restaurant.id);
      const staffCount = await dashboardService.getStaffCount(req.restaurant.id);
      const sales = await dashboardService.getLastMonthSales(req.restaurant.id);
      const response = {
        data: {
            activeOrdersCount,
            menuItemsCount,
            staffCount,
            sales
        },
        meta: {
          status: "success",
          message: "Count returned successfully"
        },
      };
      return res.status(200).json(response);
    } catch (err) {
      let errorResponse = errorHandler.handleError(err);
      let response = errorHandler.formatErrorResponse(errorResponse);
      return res.status(response.meta.code).send(response);
    }
  };
