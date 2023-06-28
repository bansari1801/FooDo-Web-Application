//Author - Karan Rathore kr202401@dal.ca
const express = require('express');
const { addStaffMember, updateStaffMember, getStaffMembersList, getStaffMemberById, deleteStaffMemberById,
 markPresent, markAbsent} = require("../controllers/staff.controller");

const staffRouter = express.Router();
const { verifyOwner } = require("../middlewares/auth.middleware");

staffRouter.post("/add",verifyOwner, addStaffMember);
staffRouter.get("/",verifyOwner, getStaffMembersList);
staffRouter.post("/",verifyOwner, getStaffMembersList);
staffRouter.get("/:id",verifyOwner, getStaffMemberById);
staffRouter.delete("/:id",verifyOwner, deleteStaffMemberById);
staffRouter.put("/update",verifyOwner, updateStaffMember);
staffRouter.post("/markpresent",verifyOwner, markPresent);
staffRouter.post("/markabsent",verifyOwner, markAbsent);

module.exports = staffRouter;


