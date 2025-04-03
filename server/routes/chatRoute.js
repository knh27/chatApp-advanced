import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { 

    addMembers,
    createGroupChat, 
    getMyChats, 
    getMyGroups, 
    removeMember ,
    leaveGroup,
    sendAttachments, 
    getChatDetails,
    renameGroup,
    deleteChat,
    getMessages

} from "../controllers/chatController.js";

import { attachmentsMulter } from "../middlewares/multer.js";
import { newGroupValidator, validateHandler } from "../lib/validators.js";


const chatRouter=Router();

chatRouter.use(isAuthenticated);
chatRouter.post("/me/new", newGroupValidator(), validateHandler, createGroupChat)
chatRouter.get("/me", getMyChats);
chatRouter.get("/me/my-groups", getMyGroups);
chatRouter.put("/me/add-members", addMembers);
chatRouter.put("/me/remove-member", removeMember);
chatRouter.delete("/me/leave/:id", leaveGroup);

chatRouter.post("/message", attachmentsMulter, sendAttachments)
chatRouter.get("/message/:id", getMessages)
chatRouter.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);


//send attachment, get Messages, get chat detail, rename, delete

export default chatRouter;