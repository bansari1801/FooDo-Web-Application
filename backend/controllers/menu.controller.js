// ==========================================
//  Author: Bansari Shah
// ==========================================

const menuErrorMsg = require('../errors/messages').menu;
const paginationErrorMsg = require('../errors/messages').pagination;
const menuService = require('../services/menu.service');
const errorHandler = require('../errors/error.handler');
const { statusCode } = require('../configs/statusCode.config');

exports.addMenu = async (req, res) => {
  try {
    const menu = await menuService.createMenu(req);
    let responseData = {};
    responseData.meta = menuErrorMsg.menuItemCreated;
    responseData.data = menu;
    res.status(menuErrorMsg.menuItemCreated.code).send(responseData);
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};

exports.updateMenu = async (req, res) => {
  try {
    if (req.params.id) {
      const menu = await menuService.updateMenu(req.params.id, req.body);
      let responseData = {};
      responseData.meta = menuErrorMsg.menuItemUpdated;
      responseData.data = menu;
      res.status(menuErrorMsg.menuItemUpdated.code).send(responseData);
    } else {
      let responseData = {};
      responseData.meta = menuErrorMsg.ParameterIdRequired;
      res.status(menuErrorMsg.ParameterIdRequired.code).send(responseData);
    }
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    if (req.params.id) {
      await menuService.deleteMenu(req.params.id);
      let responseData = {};
      responseData.meta = menuErrorMsg.menuItemDeleted;
      res.status(menuErrorMsg.menuItemDeleted.code).send(responseData);
    } else {
      let responseData = {};
      responseData.meta = menuErrorMsg.ParameterIdRequired;
      res.status(menuErrorMsg.ParameterIdRequired.code).send(responseData);
    }
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};

exports.getMenu = async (req, res) => {
  try {
    if (req.params.id) {
      const menu = await menuService.getMenu(req.params.id);
      let responseData = {};
      responseData.meta = menuErrorMsg.menuItemRetrieved;
      responseData.data = menu;
      res.status(menuErrorMsg.menuItemRetrieved.code).send(responseData);
    } else {
      let responseData = {};
      responseData.meta = menuErrorMsg.ParameterIdRequired;
      res.status(menuErrorMsg.ParameterIdRequired.code).send(responseData);
    }
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};

exports.getAllMenu = async (req, res) => {
  try {
    if (req.query.pageId === undefined) {
      response = errorHandler.formatErrorResponse(paginationErrorMsg.pageIdRequired);
      res.send(response);
    }
    if (req.query.limit === undefined) {
      response = errorHandler.formatErrorResponse(paginationErrorMsg.limitRequired);
      res.send(response);
    }

    const pageNo = parseInt(req.query.pageId);
    const size = parseInt(req.query.limit);

    if (pageNo < 0 || pageNo === 0) {
      response = errorHandler.formatErrorResponse(paginationErrorMsg.invalidPageNumber);
      res.send(response);
    }

    const menuItemsObj = await menuService.getAllMenuItems(req, pageNo, size);
    response = { data: menuItemsObj.menuItems, meta: { current_page: pageNo, records_per_page: size, total_records: menuItemsObj.totalDocuments, code: statusCode.OK.code } };
    res.send(response);
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};

exports.getCuisines = async (req, res) => {
  try {
    const cuisine = await menuService.getCusines(req.restaurant.id);
    let responseData = {};
    responseData.meta = menuErrorMsg.cuisineListRetrieved;
    responseData.data = cuisine;
    res.status(menuErrorMsg.cuisineListRetrieved.code).send(responseData);
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};

exports.getMenuList = async (req, res) => {
  try {
    const menuItems = await menuService.getMenuList(req.restaurant.id);
    let responseData = {};
    responseData.meta = menuErrorMsg.menuItemListRetrieved;
    responseData.data = menuItems;
    res.status(menuErrorMsg.menuItemListRetrieved.code).send(responseData);
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};

