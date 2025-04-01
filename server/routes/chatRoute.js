import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createGroupChat } from "../controllers/chatController.js";


const chatRouter=Router();

chatRouter.use(isAuthenticated);
chatRouter.post("/new", createGroupChat)


export default chatRouter;