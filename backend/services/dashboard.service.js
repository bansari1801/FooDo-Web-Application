// ==========================================
//  Author: Bansari Shah,Khushalkumar Gondaliya
// ==========================================

const orderModel = require("../models/order.model");
const Order = require("../models/order.model");
const moment = require("moment");
const staffModel = require("../models/staff.model");

exports.getCuisineWiseSalesData = (req) => {
  return orderModel.aggregate([
    {
      $match: {
        restaurantId: req.restaurant.id,
        createdAt: { $gte: new Date(new Date() - 30 * 60 * 60 * 24 * 1000) },
        status: "completed",
      },
    },
    { $unwind: "$orderItems" },
    {
      $group: {
        _id: "$orderItems.cuisine",
        totalSales: {
          $sum: { $multiply: ["$orderItems.qty", "$orderItems.price"] },
        },
      },
    },
    { $project: { _id: 0, cuisine: "$_id", totalSales: 1 } },
  ]);
};

exports.getMenuItemWiseSalesData = (req) => {
  return orderModel.aggregate([
    {
      $match: {
        restaurantId: req.restaurant.id,
        createdAt: { $gte: new Date(new Date() - 30 * 60 * 60 * 24 * 1000) },
        status: "completed",
      },
    },
    { $unwind: "$orderItems" },
    {
      $group: {
        _id: "$orderItems.itemName",
        totalSales: {
          $sum: { $multiply: ["$orderItems.qty", "$orderItems.price"] },
        },
      },
    },
    { $project: { _id: 0, itemName: "$_id", totalSales: 1 } },
  ]);
};

exports.getWeeklySales = async (restaurantId, numberOfDays = 7) => {
  const startDate = moment()
    .startOf("day")
    .subtract(numberOfDays, "days")
    .toDate();

  const output = await orderModel.aggregate([
    {
      $match: {
        $and: [
          {
            restaurantId: {
              $eq: restaurantId,
            },
          },
          {
            createdAt: {
              $gte: startDate,
            },
          },
          {
            status: "completed",
          },
        ],
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%m-%d-%Y",
            date: "$createdAt",
          },
        },
        date: {
          $first: {
            $dateFromParts: {
              year: {
                $year: "$createdAt",
              },
              month: {
                $month: "$createdAt",
              },
              day: {
                $dayOfMonth: "$createdAt",
              },
            },
          },
        },
        sales: {
          $sum: "$price",
        },
      },
    },
    {
      $group:
        /**
         * _id: The id of the group.
         * fieldN: The first field name.
         */
        {
          _id: null,
          data: {
            $push: {
              date: "$date",
              sales: "$sales",
            },
          },
        },
    },
    {
      $project:
        /**
         * specifications: The fields to
         *   include or exclude.
         */
        {
          _id: 0,
          data: {
            $concatArrays: [
              "$data",
              {
                $map: {
                  input: {
                    $range: [
                      0,
                      {
                        $subtract: [
                          7,
                          {
                            $size: "$data",
                          },
                        ],
                      },
                    ],
                  },
                  as: "zero",
                  in: {
                    date: {
                      $add: [
                        startDate,
                        {
                          $multiply: ["$$zero", 24 * 60 * 60 * 1000],
                        },
                      ],
                    },
                    sales: 0,
                  },
                },
              },
            ],
          },
        },
    },
    {
      $unwind:
        /**
         * path: Path to the array field.
         * includeArrayIndex: Optional name for index.
         * preserveNullAndEmptyArrays: Optional
         *   toggle to unwind null and empty values.
         */

        "$data",
    },
    {
      $replaceRoot:
        /**
         * replacementDocument: A document or string.
         */
        {
          newRoot: "$data",
        },
    },
    {
      $sort:
        /**
         * Provide any number of field/order pairs.
         */
        {
          date: 1,
        },
    },
  ]);

  console.log(output);
  return output;
};

exports.getStaffCount = async (restaurantId) => {
  let condition = {};

  condition["restaurantId"] = restaurantId;
  const staffCount = await staffModel.count(condition);
  return staffCount;
};

exports.getLastMonthSales = async (restaurantId) => {
  const startDate = moment().startOf("day").subtract(31, "days").toDate();
  let condition = {};

  condition["restaurantId"] = restaurantId;
  const sales = await orderModel.aggregate([
    {
      $match: {
        $and: [
          {
            restaurantId: {
              $eq: restaurantId,
            },
          },
          {
            createdAt: {
              $gte: startDate,
            },
          },
          {
            status: {
              $eq: "completed",
            },
          },
        ],
      },
    },
    {
      $group:
        /**
         * specifications: The fields to
         *   include or exclude.
         */
        {
          _id: null,
          sale: {
            $sum: "$price",
          },
        },
    },
  ]);

  if (sales.length > 0) return sales[0].sale;
  else return 0;
};
