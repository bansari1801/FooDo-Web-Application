const mongoose = require('mongoose');

const CuisineSchema = mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    restaurantId: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Cuisine', CuisineSchema, 'Cuisine');
