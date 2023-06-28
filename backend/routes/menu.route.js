// ==========================================
//  Author: Bansari Shah
// ==========================================

const express = require('express');
const { addMenu, updateMenu, deleteMenu, getMenu, getAllMenu, getCuisines, getMenuList } = require('../controllers/menu.controller');
const { verifyOwner } = require('../middlewares/auth.middleware');

const menuRouter = express.Router();

menuRouter.get('/list', verifyOwner, getMenuList);
menuRouter.get('/cuisine', verifyOwner, getCuisines);
menuRouter.get('/', verifyOwner, getAllMenu);
menuRouter.post('/', verifyOwner, addMenu);
menuRouter.put('/:id', verifyOwner, updateMenu);
menuRouter.get('/:id', verifyOwner, getMenu);
menuRouter.delete('/:id', verifyOwner, deleteMenu);

module.exports = menuRouter;
