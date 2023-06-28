// ==========================================
//  Author: Bansari Shah, Meet Master
// ==========================================

const { statusCode } = require('../configs/statusCode.config');

module.exports = {
  menu: {
    nameRequired: {
      code: statusCode['BAD_REQUEST'].code,
      message: 'Item Name is required',
    },
    ingredientsRequired: {
      code: statusCode['BAD_REQUEST'].code,
      message: 'Ingredients is required',
    },
    priceRequired: {
      code: statusCode['BAD_REQUEST'].code,
      message: 'Price is required',
    },
    cuisineRequired: {
      code: statusCode['BAD_REQUEST'].code,
      message: 'Cuisine is required',
    },
    spicyLevelRequired: {
      code: statusCode['BAD_REQUEST'].code,
      message: 'Spicy Level is required',
    },
    restaurantRequired: {
      code: statusCode['BAD_REQUEST'].code,
      message: 'Restaurant Id is required',
    },
    menuItemCreated: {
      code: statusCode['CREATED'].code,
      message: 'Menu Item created successfully',
    },
    menuItemUpdated: {
      code: statusCode['OK'].code,
      message: 'Menu Item updated successfully',
    },
    menuItemDeleted: {
      code: statusCode['OK'].code,
      message: 'Menu Item deleted successfully',
    },
    menuItemRetrieved: {
      code: statusCode['OK'].code,
      message: 'Menu Item retrieved successfully',
    },
    menuItemListRetrieved: {
      code: statusCode['OK'].code,
      message: 'Menu Item List retrieved successfully',
    },
    cuisineListRetrieved: {
      code: statusCode['OK'].code,
      message: 'Cuisine List retrieved successfully',
    },
    ParameterIdRequired: {
      code: statusCode['BAD_REQUEST'].code,
      message: 'Param id is required',
    },
  },
  pagination: {
    invalidPageNumber: {
      code: statusCode['BAD_REQUEST'].code,
      message: 'Invalid page id, should start with 1.',
    },
    pageIdRequired: {
      code: statusCode['BAD_REQUEST'].code,
      message: 'Page Id is required.',
    },
    limitRequired: {
      code: statusCode['BAD_REQUEST'].code,
      message: 'Limit is required.',
    },
  },
  order: {
    restaurantRequired: {
      code: statusCode['BAD_REQUEST'].code,
      message: 'Restaurant Id is required',
    },
    customerNameRequired: {
      code: statusCode['BAD_REQUEST'].code,
      message: 'Customer name is required',
    },
    phoneNumberRequired: {
      code: statusCode['BAD_REQUEST'].code,
      message: 'Phone number is required',
    },
    itemNameRequired: {
      code: statusCode['BAD_REQUEST'].code,
      message: 'Item name is required',
    },
    qtyRequired: {
      code: statusCode['BAD_REQUEST'].code,
      message: 'Quantity is required',
    },
    orderItemsRequired: {
      code: statusCode['BAD_REQUEST'].code,
      message: 'One order item must required',
    },
    orderCreated: {
      code: statusCode['CREATED'].code,
      message: 'Order created successfully',
    },
    orderUpdated: {
      code: statusCode['OK'].code,
      message: 'Order updated successfully',
    },
    orderFetched: {
      code: statusCode['OK'].code,
      message: 'Order fetched successfully',
    },
  },
  unhandledException: {
    code: statusCode['INTERNAL_SERVER_ERROR'].code,
    message: 'Something went wrong.',
  },
  dashboard: {
    salesDataForCuisine: {
      code: statusCode['OK'].code,
      message: 'Sales Data for cuisine fetched successfully',
    },
    salesDataForMenuItems: {
      code: statusCode['OK'].code,
      message: 'Sales Data for menu items fetched successfully',
    },
  },
};
