import express from "express";
import { 
    adminLogin,
    adminLogout,
    getAllChats, 
    getAllMessages, 
    getAllUsers,

 } from "../controllers/adminController.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";
import { adminOnly } from "../middlewares/auth.js";

const adminRouter=express.Router();


adminRouter.post("/verify", adminLoginValidator() , validateHandler, adminLogin);

adminRouter.post("/logout", adminLogout);


//only logged in admin can access below routes
adminRouter.use(adminOnly);

// adminRouter.get("/");

adminRouter.get("/users", getAllUsers);

adminRouter.get("/chats", getAllChats);

adminRouter.get("/messages", getAllMessages);

// adminRouter.get("/stats");

export default adminRouter; 