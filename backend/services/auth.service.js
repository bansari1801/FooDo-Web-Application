const { default: mongoose } = require("mongoose");
const Restaurant = require("../models/restaurant.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET_TOKEN } = require("../configs/jwt.config");

exports.login = async function (email, password) {

    email = email.toLowerCase();
  let restaurant = await Restaurant.findOne({ email: email });

  let role = "Owner";

  if (!restaurant) {
    restaurant = await Restaurant.findOne({ "chef.email": email });



    if (!restaurant) {
      return { msg: "Invalid credentials. " };
    }

    const chef = restaurant.chef;

    const isMatch = await bcrypt.compare(password, chef.password);
    if (!isMatch) return { msg: "Invalid credentials. " };

    role = "Chef";
  } else {
    const isMatch = await bcrypt.compare(password, restaurant.password);
    if (!isMatch) return { msg: "Invalid credentials. " };
  }

  const token = jwt.sign({ id: restaurant._id, role: role }, SECRET_TOKEN);
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
      loginRole: role,
      cuisine: restaurant.cuisine,
    },
    token: token,
  };
};
