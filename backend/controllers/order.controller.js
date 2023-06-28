// ==========================================
//  Author: Meet Master
// ==========================================

const errorMsg = require("../errors/messages").order;
const paginationErrorMsg = require("../errors/messages").pagination;
const orderService = require("../services/order.service");
const errorHandler = require("../errors/error.handler");
const { response } = require("express");
const { statusCode } = require("../configs/statusCode.config");

exports.addOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req);
    let responseData = {};
    responseData.meta = errorMsg.orderCreated;
    responseData.data = order;
    res.status(errorMsg.orderCreated.code).send(responseData);
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    if (req.params.id) {
      const order = await orderService.updateOrderById(req.params.id, req.body);
      let responseData = {};
      responseData.meta = errorMsg.orderUpdated;
      responseData.data = order;
      res.status(errorMsg.orderUpdated.code).send(responseData);
    }
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};

exports.getOrder = async (req, res) => {
  try {
    if (req.params.id) {
      const order = await orderService.getOrderById(req.params.id);
      let responseData = {};
      responseData.meta = errorMsg.orderFetched;
      responseData.data = order;
      res.status(errorMsg.orderFetched.code).send(responseData);
    }
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    let response = {};
    if (req.query.pageId === undefined) {
      response = errorHandler.formatErrorResponse(
        paginationErrorMsg.pageIdRequired
      );
      res.send(response);
    }
    if (req.query.limit === undefined) {
      response = errorHandler.formatErrorResponse(
        paginationErrorMsg.limitRequired
      );
      res.send(response);
    }

    const pageNo = parseInt(req.query.pageId);
    const size = parseInt(req.query.limit);

    if (pageNo <= 0) {
      response = errorHandler.formatErrorResponse(
        paginationErrorMsg.invalidPageNumber
      );
      res.send(response);
    }
    const ordersObj = await orderService.getAllOrders(req, pageNo, size);
    response = {
      data: ordersObj.orders,
      meta: {
        current_page: pageNo,
        records_per_page: size,
        total_records: ordersObj.totalNumberOfOrders,
        code: statusCode.OK.code,
      },
    };
    res.send(response);
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};


