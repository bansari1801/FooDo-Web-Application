// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

const {
  addRestaurant,
  updateRestaurant,
  getRestaurant,
} = require("../services/restaurant.service");
const errorHandler = require("../errors/error.handler");
var bcrypt = require("bcryptjs");
const { response } = require("express");
const { errorResponse } = require("../errors/customError.response");

exports.registerRestaurant = async (req, res) => {
  try {
    let body = req.body;

    const chef = {
      email: body.chefEmail,
      password: body.chefPassword,
      role: "Chef",
    };

    body.chef = chef;
    body.role = "Owner";
    const restaurant = await addRestaurant(body);
    let responseData = {};
    responseData.meta = {
      message: "Restaurant registered successfully",
      status: "success",
    };
    responseData.data = restaurant;
    res.status(200).send(responseData);
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    let body = req.body;

    if (req.restaurant.id != req.params.restaurantId)
      return errorResponse(res, 403, "Unauthenticated user");

    const restaurant = await updateRestaurant(body);
    let responseData = {};
    responseData.meta = {
      message: "Restaurant updated successfully",
      status: "success",
    };
    responseData.data = restaurant;
    res.status(200).send(responseData);
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};

exports.getRestaurant = async (req, res) => {
  try {
    let body = req.body;

    if (req.restaurant.id != req.params.restaurantId)
      return errorResponse(res, 403, "Unauthenticated user");

    const restaurant = await getRestaurant(req.params.restaurantId);
    let responseData = {};
    responseData.meta = {
      message: "Restaurant returned successfully",
      status: "success",
    };
    responseData.data = restaurant;
    res.status(200).send(responseData);
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};
