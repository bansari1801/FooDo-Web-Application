// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

const errorHandler = require("../errors/error.handler");
const { login } = require("../services/auth.service");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await login(email, password);

    let responseData = {};
    responseData.meta = {
      message: "Login successfull",
      status: "success",
    };

    if (token.hasOwnProperty("msg")) {
      responseData.meta = responseData.meta = {
        message: "Invalid credentials ",
        status: "fail",
      };
    }

    responseData.data = token;
    return res.status(200).send(responseData);
  } catch (err) {
    let errorResponse = errorHandler.handleError(err);
    let response = errorHandler.formatErrorResponse(errorResponse);
    return res.status(response.meta.code).send(response);
  }
};

exports.logout = async (req, res) => {
  let responseData = {};
  responseData.meta = "Logout successful";
  return res.status(200).send(responseData);
};
