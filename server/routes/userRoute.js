import { Router } from "express";
import { singleAvatar } from "../middlewares/multer.js";
import {createUser, login, getProfile, logout, searchUser, searchUserById, sendFriendRequest, acceptFriendRequest, getNotifications, getMyFriends} from "../controllers/userController.js"
import { isAuthenticated } from "../middlewares/auth.js";
import { acceptRequestValidator, loginValidator, registerValidator, sendRequestValidator, validateHandler } from "../lib/validators.js";
// console.log(createUser)

const userRouter=Router();

userRouter.post("/new",singleAvatar, registerValidator(), validateHandler, createUser)//calling registerValidator bcz it will return array 
userRouter.post("/login",loginValidator(), validateHandler, login)


//userRouter.use(isAuthenticated) ab iske baad sare protected routes

userRouter.get("/me",isAuthenticated, getProfile);
userRouter.post("/logout", logout);
userRouter.get("/search", isAuthenticated,searchUser);

userRouter.put("/send-request", 
    isAuthenticated,
    sendRequestValidator(), 
    validateHandler, 
    sendFriendRequest
);

userRouter.put("/accept-request", 
    isAuthenticated,
    acceptRequestValidator(), 
    validateHandler, 
    acceptFriendRequest
);


userRouter.get("/notifications", isAuthenticated, getNotifications)

userRouter.get("/friends", isAuthenticated, getMyFriends)


userRouter.get("/:id", isAuthenticated,searchUserById);

export default userRouter;