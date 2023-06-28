// ==========================================
//  Author: Bansari Shah,Khushalkumar Gondaliya
// ==========================================

const express = require('express');

const { verifyOwner } = require('../middlewares/auth.middleware');
const { countCuisineWiseSales, countItemWiseSales, getCounts } = require('../controllers/dashboard.controller');
const { getWeeklySales } = require('../controllers/dashboard.controller');

const dashboardRouter = express.Router();

dashboardRouter.get('/cuisine-sales-data', verifyOwner, countCuisineWiseSales);
dashboardRouter.get('/item-sales-data', verifyOwner, countItemWiseSales);
dashboardRouter.get('/daily-sales-data', verifyOwner, getWeeklySales);
dashboardRouter.get('/get-counts', verifyOwner, getCounts);

module.exports = dashboardRouter;
