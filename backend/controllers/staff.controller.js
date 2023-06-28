//Author - Karan Rathore kr202401@dal.ca
const staffService = require('../services/staff.service');
const errorHandler = require('../errors/error.handler');

exports.getStaffMembersList = async (req, res) => {
    try {
        const staffMembersList = await staffService.getStaffMembersList(req.body,  req.restaurant.id);
        const totalCount = await staffService.getStaffMembersCount(req.body,  req.restaurant.id);
        let response = {};
        response.meta = "Staff members list fetched successfully";
        response.data = staffMembersList;
        response.totalCount = totalCount;
        res.status(200).send(response);
      } catch (err) {
        let errorResponse = errorHandler.handleError(err);
        let response = errorHandler.formatErrorResponse(errorResponse);
        return res.status(response.meta.code).send(response);
      }
};

exports.getStaffMemberById = async (req, res) => {
    try {
        const staffMember= await staffService.getStaffMemberById(req.params.id);
        let response = {};
        response.meta = "Staff member fetched successfully";
        response.data = staffMember;
        res.status(200).send(response);
      } catch (err) {
        let errorResponse = errorHandler.handleError(err);
        let response = errorHandler.formatErrorResponse(errorResponse);
        return res.status(response.meta.code).send(response);
      }
};

exports.deleteStaffMemberById = async (req, res) => {
    try {
            await staffService.deleteStaffMemberById(req.params.id);
            let response = {};
            response.meta = "Staff member deleted successfully";
            response.data = true;
            res.status(200).send(response);
          } catch (err) {
            let errorResponse = errorHandler.handleError(err);
            let response = errorHandler.formatErrorResponse(errorResponse);
            return res.status(response.meta.code).send(response);
          }
};

exports.addStaffMember = async (req, res) => {
  try {
          await staffService.addStaffMember(req.body, req.restaurant.id,);
          let response = {};
          response.meta = "Staff member created successfully";
          response.data = true;
          res.status(200).send(response);
        } catch (err) {
          let errorResponse = errorHandler.handleError(err);
          let response = errorHandler.formatErrorResponse(errorResponse);
          return res.status(response.meta.code).send(response);
        }
};

exports.updateStaffMember = async (req, res) => {
  try {
             const staffMember = await staffService.updateStaffMember(req.body, req.restaurant.id,);
             let response = {};
             response.meta = "Staff member deleted successfully";
             response.data = staffMember;
             res.status(200).send(response);
           } catch (err) {
             let errorResponse = errorHandler.handleError(err);
             let response = errorHandler.formatErrorResponse(errorResponse);
             return res.status(response.meta.code).send(response);
           }
};

exports.markPresent = async (req, res) => {
  try {
               const staffMember = await staffService.markPresent(req.body);
               let response = {};
               response.meta = "Staff member made present successfully";
               response.data = staffMember;
               res.status(200).send(response);
             } catch (err) {
               let errorResponse = errorHandler.handleError(err);
               let response = errorHandler.formatErrorResponse(errorResponse);
               return res.status(response.meta.code).send(response);
             }
};

exports.markAbsent = async (req, res) => {
  try {
               const staffMember = await staffService.markAbsent(req.body);
               let response = {};
               response.meta = "Staff member made absent successfully";
               response.data = staffMember;
               res.status(200).send(response);
             } catch (err) {
               let errorResponse = errorHandler.handleError(err);
               let response = errorHandler.formatErrorResponse(errorResponse);
               return res.status(response.meta.code).send(response);
             }
};
