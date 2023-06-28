const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const ChefSchema = new mongoose.Schema(
  {

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
    role: {
      type: String,
      required: true,
    }
}
);


const Chef = mongoose.model("Chef", ChefSchema, "Chef");
module.exports = Chef
module.exports = ChefSchema