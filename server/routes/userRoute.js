import { Router } from "express";
import { singleAvatar } from "../middlewares/multer.js";
import {createUser, login, getProfile, logout, searchUser} from "../controllers/userController.js"
import { isAuthenticated } from "../middlewares/auth.js";
import { loginValidator, registerValidator, validateHandler } from "../lib/validators.js";
// console.log(createUser)

const userRouter=Router();

userRouter.post("/new",singleAvatar, registerValidator(), validateHandler, createUser)//calling registerValidator bcz it will return array 
userRouter.post("/login",loginValidator(), validateHandler, login)


//userRouter.use(isAuthenticated) ab iske baad sare protected routes

userRouter.get("/me",isAuthenticated, getProfile);
userRouter.post("/logout", logout);
userRouter.get("/search", searchUser);

export default userRouter;