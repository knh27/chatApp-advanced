import { Router } from "express";
import { singleAvatar } from "../middlewares/multer.js";
import {createUser, login, getProfile, logout, searchUser} from "../controllers/userController.js"
import { isAuthenticated } from "../middlewares/auth.js";
// console.log(createUser)

const userRouter=Router();

userRouter.post("/new",singleAvatar, createUser)
userRouter.post("/login", login)


//userRouter.use(isAuthenticated) ab iske baad sare protected routes

userRouter.get("/me",isAuthenticated, getProfile);
userRouter.post("/logout", logout);
userRouter.get("/search", searchUser);

export default userRouter;