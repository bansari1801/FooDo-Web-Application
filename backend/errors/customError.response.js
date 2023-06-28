// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

// Retrieve and return all errors from the database.
exports.errorResponse = (res, statusCode, message) => {
  const data = {
    meta: {
      status: "fail",
      statusCode: statusCode,
    },
    data: {
      message: message,
    },
  };

  return res.status(statusCode).json(data);
};
