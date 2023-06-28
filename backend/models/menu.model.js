// ==========================================
//  Author: Bansari Shah
// ==========================================

const mongoose = require('mongoose');
const errorMsg = require('../errors/messages').menu;

const MenuSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    restaurantId: {
      type: String,
      required: [true, errorMsg.restaurantRequired.message],
    },
    name: {
      type: String,
      required: [true, errorMsg.nameRequired.message],
    },
    ingredients: {
      type: String,
      required: [true, errorMsg.ingredientsRequired.message],
    },
    price: {
      type: String,
      required: [true, errorMsg.priceRequired.message],
    },
    cuisine: {
      type: String,
      required: [true, errorMsg.cuisineRequired.message],
    },
    spicyLevel: {
      type: String,
      required: [true, errorMsg.spicyLevelRequired.message],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Menu', MenuSchema, 'Menu');
