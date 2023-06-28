// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

const jwt = require("jsonwebtoken");
const { SECRET_TOKEN } = require("../configs/jwt.config");
const errorHandler = require("../errors/error.handler");
const { errorResponse } = require("../errors/customError.response");

const verifyToken = async (req) => {
  let token = req.header("Authorization");

  if (!token) {
    return null;
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }

  const verified = jwt.verify(token, SECRET_TOKEN);
  return verified;
};

exports.verifyOwner = async (req, res, next) => {
  try {
    const verified = await verifyToken(req);

    if (verified === null) {
      return errorResponse(res, 401, "Unauthenticated User");
    }
    if (verified.role === "Owner") {
      req.restaurant = verified;
      next();
    } else {
      return errorResponse(res, 401, "Unauthenticated User");
    }
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};

exports.verifyChef = async (req, res, next) => {
  try {
    const verified = await verifyToken(req);
    if(verified == null){
        return errorResponse(res, 401, "Unauthenticated User");
    }
    if (verified.role === "Chef") {
      req.restaurant = verified;
      next();
    } else {
      return errorResponse(res, 401, "Unauthenticated User");
    }
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};
