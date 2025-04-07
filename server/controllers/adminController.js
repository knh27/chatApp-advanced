import errors from "../middlewares/errors.js"
import { User } from "../models/userSchema.js";
import { Chat } from "../models/chatSchema.js";
import { Message } from "../models/messageSchema.js";
const {tryCatch, ErrorHandler} = errors;

import jwt from "jsonwebtoken"

export const getAllUsers=tryCatch(async(req, res)=>{
    const users=await User.find({});

    const transfromedUsersPromise=users.map(async ({name, username, avatar, _id})=>{

        const[groups, friends]=await Promise.all([
            Chat.countDocuments({groupChat:true, members:_id}),
            Chat.countDocuments({groupChat:false, members:_id})
        ]);

        return {
            name, 
            username,
            avatar:avatar.url,
            _id,
            groups,
            friends
        }
    })

    const transfromedUsers=await Promise.all(transfromedUsersPromise)

    res.status(200).json({
        success:true,
        data:transfromedUsers
    })
     
})



export const getAllChats=tryCatch(async(req, res)=>{
    const chats=await Chat.find({})
        .populate("members", "name avatar")
        .populate("creator", "name avatar")

    const transfromedChatsPromise=chats.map(async ({_id, members, groupChat, name, creator})=>{
        const totalMessages=await Message.countDocuments({chat:_id});

        return {
            _id,
            groupChat,
            name,
            avatar:members.slice(0,3).map((member)=>{
                return {
                    _id:member._id,
                    name:member.name,
                    avatar:member.avatar.url,
                }
            }),
            creator:{
                name:creator?.name || "None",
                avatar:creator?.avatar.url || ""
            },

            totalMembers:members.length,
            totalMessages,

        }
    })

    const transfromedChats=await Promise.all(transfromedChatsPromise);

    res.status(200).json({
        success:true,
        data:transfromedChats
    })
})


export const getAllMessages=tryCatch(async(req, res)=>{
    const messages=await Message.find({})
        .populate("chat", "groupChat")
        .populate("sender" , "name avatar")

    const transfromedMessagesPromise=messages.map(({_id, content, attachments, createdAt, chat, sender})=>{

        return ({
            _id, 
            attachments,
            content,
            createdAt,
            chat:chat._id,
            groupChat:chat.groupChat,
            sender:{
                _id:sender._id,
                name:sender.name,
                avatar:sender.avatar.url
            }
        })
    })

    const transfromedMessages=await Promise.all(transfromedMessagesPromise);

    res.status(200).json({
        success:true,
        data:transfromedMessages
    })
} )



export const adminLogin=tryCatch(async(req, res, next)=>{

    const {secretKey}=req.body;
    console.log(secretKey, "adminLoagin")

    const isMatched=(secretKey===process.env.ADMIN_SECRET_KEY);

    if(!isMatched){
        return next(new ErrorHandler("Invalid key", 401))
    }
    const token=jwt.sign(secretKey, process.env.ADMIN_SECRET_KEY);

    return res.status(200).cookie("admin-token", token, {
        maxAge: 15 * 60 * 1000,
        sameSite: "none",
        httpOnly: true,
        secure: true
    }).json({
        success:true,
        message:"Authenticated successfully"
    })

})


export const adminLogout=tryCatch(async(req, res, next)=>{

    return res.status(200).cookie("admin-token", "", {
        maxAge: 0,
        sameSite: "none",
        httpOnly: true,
        secure: true
    }).json({
        success:true,
        message:"logged out successfully"
    })

})

