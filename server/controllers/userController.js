import mongoose from "mongoose";
import { User } from "../models/userSchema.js";
import { Request } from "../models/requestSchema.js";
import jwt from "jsonwebtoken"
// import {config} from "dotenv"
import { compare } from "bcryptjs";

import errors from "../middlewares/errors.js";
import { Chat } from "../models/chatSchema.js";
const { tryCatch, ErrorHandler } = errors;

import { emitEvent } from "../utils/utility.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";


// config();

export const createAndSendToken = (res, user, code, message) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    return res.status(code).cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        httpOnly: true,
        secure: true
    }).json({
        success: true,
        message
    })
}


export const createUser =tryCatch( async (req, res) => {
    const { name, username, password, bio, avatar = { public_id: "abcd", url: "abc" } } = req.body;

    const file=req.file;
    console.log(file)
    if(!file) return next(new ErrorHandler("uplaod avatar", 400));

    const newUser = await User.create({
        name,
        username,
        password,
        bio,
        avatar
    });
    return res.status(201).json({
        status: "success",
        data: {
            newUser
        }
    })

}
)

export const login = tryCatch(
    async (req, res, next) => {
        const { username, password } = req.body;

        if (!username || !password) next(new ErrorHandler("username or password missing", 404));

        const user = await User.findOne({ username }).select("+password");

        if (!user) return next(new ErrorHandler("invalid username or password", 404));



        const isMatch = await compare(password, user.password);
        if (!isMatch) return next(new ErrorHandler("invalid username or password", 404))

        createAndSendToken(res, user, 200, `welcome back ${user.name}`);

    }
)

export const getProfile = tryCatch(
    async (req, res) => {
        const user = await User.findById(req.userId);
        res.status(200).json({
            success: true,
            data: user
        })
    }
)

export const logout = (req, res) => {
    return res.status(200).cookie("jwt", "", {
        maxAge: 0,
        sameSite: "none",
        httpOnly: true,
        secure: true
    }).json({
        success: true,
        message: "Logged-Out successfully"
    })
}


export const searchUser = tryCatch(async (req, res) => {
    const { name = "" } = req.query;
    console.log(req.userId)
    //finding my all chats
    const myChats = await Chat.find({ groupChat: false, members: { $in: [req.userId] } });

    // console.log(myChats)

    //getting members array
    const usersFromMyChats = myChats.map((chat) => chat.members).flat();

    const allUsersExceptMeAndFriends = await User.find({
        _id: { $nin: usersFromMyChats },
        name: { $regex: name, $options: "i" },//case insensitive
    });

    console.log(allUsersExceptMeAndFriends)

    const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
        _id,
        name,
        avatar: avatar.url
    }))

    return res.status(200).json({
        success: true,
        users
    })
})



// export const searchUser = tryCatch(async (req, res) => {
//     const { name = "" } = req.query;
//     console.log("Logged in user ID:", req.userId);

//     // Get all personal chats where the logged-in user is a member
//     const myChats = await Chat.find({ groupChat: false, members: { $in: [req.userId] } });

//     // Extract all members from these chats
//     const usersFromMyChats = myChats.map((chat) => chat.members).flat();

//     // Convert ObjectIds to strings and deduplicate them
//     const usersFromMyChatsUnique = [...new Set(usersFromMyChats.map(memberId => memberId.toString()))];

//     // Exclude both your friends and yourself
//     const excludedIds = [...usersFromMyChatsUnique, req.userId.toString()];
//     console.log("Excluded IDs:", excludedIds);

//     // Find users not in excludedIds, filtering by name if provided
//     const allUsersExceptMeAndFriends = await User.find({
//         _id: { $nin: excludedIds },
//         name: { $regex: name, $options: "i" } // Case insensitive search
//     });

//     console.log("Users found:", allUsersExceptMeAndFriends);

//     // Map the result to return only the required fields
//     const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
//         _id,
//         name,
//         avatar: avatar.url
//     }));

//     return res.status(200).json({
//         success: true,
//         users
//     });
// });




export const searchUserById = tryCatch(async (req, res) => {
    const ID = req.params.id;
    const user = await User.findById(ID);
    return res.status(200).json({
        success: true,
        user
    })
})




export const sendFriendRequest = tryCatch(async (req, res, next) => {

    const { receiverId } = req.body;
    const request = await Request.findOne({
        $or: [
            { sender: req.userId, receiver: receiverId },
            { sender: receiverId, receiver: req.userId }
        ]
    })
    if (request) return next(new ErrorHandler("request already sent", 400));

    await Request.create({
        sender: req.userId,
        receiver: receiverId
    });

    emitEvent(req, NEW_REQUEST, [receiverId])

    return res.status(200).cookie("jwt", "", {
        maxAge: 0,
        sameSite: "none",
        httpOnly: true,
        secure: true
    }).json({
        success: true,
        message: "Friend Request Sent"
    })
})


export const acceptFriendRequest = tryCatch(async (req, res, next) => {
    const { requestId, accept } = req.body;
    const request = await Request.findById(requestId)
        .populate("sender", "name")
        .populate("receiver", "name")

    if (!request) return next(new ErrorHandler("request not found", 404));

    if (request.receiver._id.toString() !== req.userId.toString()) {
        return next(new ErrorHandler("you are not authorized to accept this request", 401));
    }

    if (!accept) {
        await request.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Friend request rejected"
        })
    }

    const members = [request.sender._id, request.receiver._id];

    await Promise.all([
        Chat.create({
            members,
            name: `${request.sender.name}- ${request.receiver.name}`,
        }),
        request.deleteOne(),
    ])

    emitEvent(req, REFETCH_CHATS, members)

    return res.status(200).json({
        success: true,
        message: "Friend Request Accepted",
        senderId: request.sender._id,
    })
})



export const getNotifications = tryCatch(async (req, res) => {
    const requests = await Request.find({ receiver: req.userId }).populate(
        "sender", "name avatar"
    );

    const allRequests = requests.map(({ _id, sender }) => ({
        _id,
        sender: {
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url,
        }
    }))

    return res.status(200).json({
        success: true,
        allRequests
    })
})




// export const getMyFriends = tryCatch(async (req, res, next) => {
//     const chatID = req.query.chatId;

//     const chats = await Chat.find({
//         members: req.userId,
//         groupChat: false,
//     }).populate("members", "name avatar")

//     const friends = chats.map(({ members }) => {
//         const otherUser = getOtherMember(members, req.userId)
//         return {
//             _id: otherUser._id,
//             name: otherUser.name,
//             avatar: otherUser.avatar.url
//         }
//     })


//     if (chatID) {
//         const chat=await Chat.findById(chatID);
//         const availableFriends=friends.filter(
//             (friend)=>!chat.members.includes(friend._id)
//         )

//         return res.status(200).json({
//             success:true,
//             friends:availableFriends
//         })
//     } else {
//         return res.status(200).json({
//             success: true,
//             friends
//         })
//     }


// })


export const getMyFriends = tryCatch(async (req, res, next) => {
    const chatID = req.query.chatId;

    const chats = await Chat.find({
        members: req.userId,
        groupChat: false,
    }).populate("members", "name avatar"); // Fixed projection issue

    const friends = chats
        .map(({ members }) => {
            const otherUser = members.find(
                (member) => member._id.toString() !== req.userId.toString()
            );

            console.log(otherUser)
            return otherUser
                ? {
                      _id: otherUser._id,
                      name: otherUser.name,
                      avatar: otherUser.avatar?.url,
                  }
                : null;
        })

    if (chatID) {
        const chat = await Chat.findById(chatID);
        const availableFriends = friends.filter(
            (friend) => !chat.members.some((id) => id.toString() === friend._id.toString())
        );

        return res.status(200).json({
            success: true,
            friends: availableFriends,
        });
    }

    return res.status(200).json({
        success: true,
        friends,
    });
});
