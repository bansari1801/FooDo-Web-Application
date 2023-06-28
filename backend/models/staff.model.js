//Author - Karan Rathore kr202401@dal.ca
const mongoose = require('mongoose');

const StaffSchema = mongoose.Schema({
  restaurantId: String,
  name: String,
  type: String,
  contact: String,
  emergencyContact: String,
  bloodGroup: String,
  attendance : [Date]
}, {versionKey:false});

module.exports = mongoose.model('Staff', StaffSchema, 'Staff');