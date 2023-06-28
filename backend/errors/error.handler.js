// ==========================================
//  Author: Khushalkumar Gondaliya, Bansari Shah
// ==========================================

const { statusCode } = require("../configs/statusCode.config");
const { unhandledException } = require("./messages");

// Retrieve and return all errors from the database.
exports.handleError = (err) => {
  let errorMsg = {};
  let errors = [];
  if (err.name === "ValidationError") {
    for (let field in err.errors) {
      errors.push(err.errors[field].message);
    }
  } else if (err.name === "MongoServerError") {
    if (err.keyPattern?.hasOwnProperty("email")) {
      errors.push("Restaurant email already registered");
    }
    if (err.keyPattern?.hasOwnProperty("chef.email")) {
      errors.push("Chef email already  registered");
    }
    errorMsg["code"] = err.status ? err.status : statusCode.BAD_REQUEST.code;
    errorMsg["message"] = errors;
    errorMsg["status"] = "fail";
    return errorMsg;
  } else {
    errorMsg["code"] = err.status
      ? err.status
      : statusCode.INTERNAL_SERVER_ERROR.code;
    errors.push(err.message || unhandledException);
    errorMsg["message"] = errors;
    errorMsg["status"] = "fail";
    return errorMsg;
  }
};

//Format error message
exports.formatErrorResponse = (errorMsg, extraDetail = null) => {
  let errorMsgDesc = errorMsg.message;
  if (errorMsgDesc["errors"] !== undefined) {
    errorMsgDesc = errorMsgDesc["errors"];
  } else if (!Array.isArray(errorMsgDesc)) {
    if (extraDetail != null) errorMsgDesc = errorMsgDesc + extraDetail;
    errorMsgDesc = [errorMsgDesc];
  }
  return {
    meta: errorMsg,
  };
};
