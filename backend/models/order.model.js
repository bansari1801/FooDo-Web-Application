// ==========================================
//  Author: Meet Master
// ==========================================

const { default: mongoose } = require('mongoose');
const errorMsg = require('../errors/messages').order;

const OrderSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    restaurantId: {
      type: String,
      required: [true, errorMsg.restaurantRequired.message],
    },
    customerName: {
      type: String,
      required: [true, errorMsg.customerNameRequired.message],
    },
    phoneNumber: {
      type: String,
      required: [true, errorMsg.phoneNumberRequired.message],
    },
    price: {
      type: Number,
      required: [true, errorMsg.phoneNumberRequired.message],
    },
    orderItems: {
      type: [
        {
          itemName: {
            type: String,
            required: [true, errorMsg.itemNameRequired.message],
          },
          qty: {
            type: Number,
            required: [true, errorMsg.qtyRequired.message],
          },
          cuisine: {
            type: String,
          },
          price: {
            type: Number,
          },
          _id: false,
        },
      ],
      required: true,
      validate: {
        validator: (arr) => {
          return arr.length > 0;
        },
        message: errorMsg.orderItemsRequired.message,
      },
    },
    totalItems: {
      type: Number,
    },
    status: {
      type: String,
      default: 'active',
    },
    preparationStatus: {
      type: String,
      default: 'received',
    },
  },
  { timestamps: true, versionKey: false }
);

OrderSchema.pre('save', function (next) {
  this.totalItems = this.orderItems.length;
  next();
});

module.exports = mongoose.model('Order', OrderSchema, 'Orders');
