// ==========================================
//  Author: Khushalkumar Gondaliya
// ==========================================

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const ChefSchema = require("./chef.model");

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 50,
    },
    firstName: {
      type: String,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    chef: {
      type: ChefSchema,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    picturePath: {
      type: String,
      default: "",
    },
    mobileNumber: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    cuisine: Array,
  },
  { timestamps: true }
);

RestaurantSchema.pre("save", async function (next) {
  var restaurant = this;
  var SALT_FACTOR = 5;

  if (!restaurant.isModified("password")) return next();

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(restaurant.password, salt);
  const chefPasswordHash = await bcrypt.hash(restaurant.chef.password, salt);

  restaurant.chef.password = chefPasswordHash;

  restaurant.email = restaurant.email.toLowerCase();
  restaurant.chef.email = restaurant.chef.email.toLowerCase();

  restaurant.password = passwordHash;
  next();
});

RestaurantSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const Restaurant = mongoose.model("Restaurant", RestaurantSchema, "Restaurant");
module.exports = Restaurant;
