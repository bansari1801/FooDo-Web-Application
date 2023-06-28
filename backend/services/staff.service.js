//Author - Karan Rathore kr202401@dal.ca
const staffModel = require('../models/staff.model');
const { default: mongoose } = require('mongoose');

exports.getStaffMembersList = async (reqBody,restaurantId) => {
    let date = new Date(reqBody.date);
    let keyword = reqBody.keyword;
    let type = reqBody.type;
    if(!type || type === 'All')
        type = "";
    return staffModel.aggregate([
          { "$match": { name: new RegExp(keyword, 'i'),  type: new RegExp(type, 'i'), restaurantId: new RegExp(restaurantId, 'i')  }},
          { "$addFields": {
              "attendanceToday": { "$in": [date, "$attendance"] }
          }},
          { "$skip" : reqBody.skip },
          { "$limit" : reqBody.limit },
          { "$sort": { "name": 1 }}
    ]);
};

exports.getStaffMembersCount= async (reqBody, restaurantId) => {
    let keyword = reqBody.keyword;
    let type = reqBody.type;
    if(!type || type === 'All')
        type = "";
    return await staffModel.countDocuments({ name: new RegExp(keyword, 'i'),  type: new RegExp(type, 'i'), restaurantId: new RegExp(restaurantId, 'i')  });
};

exports.getStaffMemberById = async (id) => {
    return await staffModel.findOne({ _id : id});
};

exports.deleteStaffMemberById = async (id) => {
    return await staffModel.deleteOne({ _id : id });
};

exports.addStaffMember = async (req, restaurantId) => {
  const staffMember = new staffModel({
        restaurantId: restaurantId,
        name: req.name,
        type: req.type,
        contact: req.contact,
        emergencyContact: req.emergencyContact,
        bloodGroup: req.bloodGroup
      });

  return staffMember.save();

};

exports.updateStaffMember = async (req, restaurantId) => {
    const dataToSet = {
                            restaurantId: restaurantId,
                            name: req.name,
                            type: req.type,
                            contact: req.contact,
                            emergencyContact: req.emergencyContact,
                            bloodGroup: req.bloodGroup
                          };
    return await staffModel.findOneAndUpdate({ _id : req.staffId}, dataToSet, { new: true });
};

exports.markPresent = async (req) => {
    return await staffModel.findOneAndUpdate( { _id : req.staffId}, { $push: { 'attendance': req.date } }, {new:true});
};

exports.markAbsent = async (req) => {
    return await staffModel.findOneAndUpdate( { _id : req.staffId}, { $pull: { 'attendance': req.date } }, {new:true});
};

