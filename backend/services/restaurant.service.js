// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant.model");

exports.addRestaurant = async (data) => {
  data._id = new mongoose.Types.ObjectId();
  data.chef._id = new mongoose.Types.ObjectId();
  const restaurant = new Restaurant(data);
  await restaurant.save();

  return {
    name: restaurant.name,
    email: restaurant.email,
    chef: restaurant.chef,
    firstName: restaurant.firstName,
    lastName: restaurant.lastName,
    mobileNumber: restaurant.mobileNumber,
    address: restaurant.addresss,
    picturePath: restaurant.picturePath,
    _id: restaurant._id,
    role: restaurant.role,
  };
};

exports.updateRestaurant = async (data) => {
  const restaurant = await Restaurant.findByIdAndUpdate(
    data.id,
    {
      $set: {
        name: data.name,
        email: data.email,
        "chef.email": data.chefEmail,
        firstName: data.firstName,
        lastName: data.lastName,
        mobileNumber: data.mobileNumber,
        address: data.address,
        cuisine: data.cuisines,
      },
    },
    { new: true }
  );

  return {
    restaurant: {
      name: restaurant.name,
      email: restaurant.email,
      chef: restaurant.chef,
      firstName: restaurant.firstName,
      lastName: restaurant.lastName,
      mobileNumber: restaurant.mobileNumber,
      address: restaurant.addresss,
      picturePath: restaurant.picturePath,
      _id: restaurant._id,
      role: restaurant.role,
      loginRole: restaurant.role,
      cuisine: restaurant.cuisine,
    },
  };
};

exports.getRestaurant = async (id) => {
  const restaurant = await Restaurant.findById(id);

  return {
    restaurant: {
      name: restaurant.name,
      email: restaurant.email,
      chef: restaurant.chef,
      firstName: restaurant.firstName,
      lastName: restaurant.lastName,
      mobileNumber: restaurant.mobileNumber,
      address: restaurant.address,
      picturePath: restaurant.picturePath,
      _id: restaurant._id,
      role: restaurant.role,
      loginRole: restaurant.role,
      cuisine: restaurant.cuisine,
    },
  };
};
