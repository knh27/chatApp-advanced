import { ALERT, NEW_ATTACHMENT, NEW_MESSAGE_ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import errors from "../middlewares/errors.js";
const { ErrorHandler, tryCatch } = errors;
import { Chat } from "../models/chatSchema.js";
import { Message } from "../models/messageSchema.js";
import { User } from "../models/userSchema.js";
import { deleteFilesFromCloudinary, emitEvent } from "../utils/utility.js";



const createGroupChat = tryCatch(async (req, res, next) => {
    const { name, members } = req.body;

    if (members.length < 2) {
        return next(
            new ErrorHandler("Group chat have atleast 3 members", 400)
        )
    }

    const allMembers = [...members, req.userId];
    await Chat.create({
        name,
        groupChat: true,
        creator: req.userId,
        members: allMembers
    })

    emitEvent(req, ALERT, allMembers, `welcome to ${name} group`);
    emitEvent(req, REFETCH_CHATS, members)//jaise hi group create ho, refetch ho jae taaki baaki members bhi updated ho jae 

    return res.status(201).json({
        success: true,
        message: `${name} created`
    })
})


const getMyChats = tryCatch(async (req, res, next) => {
    const chats = await Chat.find({ members: req.userId }).populate("members", "name avatar")

    // console.log(chats)

    const transformedChats = chats.map((chat) => {
        const { _id, name, members, groupChat } = chat;

        const otherMember = getOtherMember(members, req.userId)
        return {
            _id,
            groupChat,
            name: groupChat ? name : otherMember.name,
            avatar: groupChat ? members.slice(0, 3).map((member) => member.avatar.url) : [otherMember.avatar.url],
            members: members.reduce((prev, cur) => {
                if (cur._id.toString() != req.userId.toString()) {
                    prev.push(cur._id);
                }
                return prev;
            }, [])

        }
    })

    return res.status(200).json({
        success: true,
        transformedChats
    })
})


const getMyGroups = tryCatch(async (req, res, next) => {
    const chats = await Chat.find({
        members: req.userId,
        groupChat: true,
        creator: req.userId,
    }).populate("members", "name avatar");

    const groups = chats.map((group) => {
        const { members, _id, groupChat, name } = group;

        return ({
            _id,
            groupChat,
            name,
            avatar: members.slice(0, 3).map((member) => { //avatar is array of urls of members
                const { avatar } = member;
                return avatar.url;
            })
        })
    })

    return res.status(200).json({
        success: true,
        groups// members
    })
})


const addMembers = tryCatch(async (req, res, next) => {
    const { chatId, members } = req.body;
    if (!chatId || members.length < 1) {
        return next(new ErrorHandler("Invalid credentials", 401));
    }

    const chat = await Chat.findById(chatId);

    if (!chat) return next(new ErrorHandler("chat is not found", 404));

    if (!chat.groupChat) return next(new ErrorHandler("This is not a group chat", 400));

    if (chat.creator.toString() !== req.userId.toString()) {
        return next(new ErrorHandler("Group creators are only allowed to add members", 403));
    }

    const allNewMembersPromise = members.map((i) => User.findById(i));// it is an array of promised sent by User.findById and members is from req.body, not from chat

    const allNewMembers = await Promise.all(allNewMembersPromise);

    const uniqueMembersId = allNewMembers.filter(
        (i) => !chat.members.includes(i._id.toString())//keval wahi liye hain jo chat members mein included nahi hain
    )


    chat.members.push(...uniqueMembersId.map((i) => i._id));

    if (chat.members.length > 100) {
        return next(new ErrorHandler("Group limit reached", 400));
    }

    await chat.save();

    const allUsersName = allNewMembers.map((i) => i.name).join(",");

    emitEvent(req, ALERT, chat.members, `${allUsersName} has been added in the group`)

    return res.status(200).json({
        success: true,
        allNewMembers
    })

})


const removeMember = tryCatch(async (req, res, next) => {
    const { userId, chatId } = req.body;

    const [chat, userToBeRemoved] = await Promise.all([Chat.findById(chatId), User.findById(userId, "name")])

    console.log(userToBeRemoved)
    if (!chat) return next(new ErrorHandler("chat not found", 404));

    if (!chat.groupChat) return next(new ErrorHandler("this is not  a group chat", 400))

    if (chat.creator.toString() !== req.userId.toString()) return next(new ErrorHandler("bhaag bsdk, tu admin nahi hai", 403))

    if (chat.members.length <= 3) return next(new ErrorHandler("group banya tha kis liye, fir aapas mein baat kar", 400));

    chat.members = chat.members.filter(
        (member) => member.toString() !== userId.toString()
    )

    await chat.save();

    emitEvent(
        req,
        ALERT,
        chat.members,
        `${userToBeRemoved} ko bhaga diya`
    );
    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
        success: true,
        message: "bhaga diya"
    });
})


const leaveGroup = tryCatch(async (req, res, next) => {

    const chatId = req.params.id;//it's id of chat, not id of user
    console.log(chatId)
    const chat = await Chat.findById(chatId);
    console.log(chat)

    if (!chat) return next(new ErrorHandler("chat is not found", 404));

    if (!chat.groupChat) return next(new ErrorHandler("this is not a group chat", 400));

    const remainingMembers = chat.members.filter(
        (member) => member.toString() !== req.userId.toString()
    )

    if (remainingMembers.length < 3) return next(new ErrorHandler("ab nahi chhor sakta, group delete kar de"));

    if (chat.creator.toString() === req.userId.toString()) {
        const randomIndex = Math.floor(Math.random() * remainingMembers.length);
        const newAdmin = remainingMembers[randomIndex];
        chat.creator = newAdmin;

    }
    chat.members = remainingMembers;
    const [user] = await Promise.all([User.findById(req.userId, "name"), chat.save()]);

    emitEvent(req, ALERT, chat.members, `${user.name} bhaag gaya group se`)

    res.status(200).json({
        success: true,
        message: `${user.name} bhaag gaya group se`
    })
})


const sendAttachments = tryCatch(async (req, res, next) => {
    const { chatID } = req.body;
    // console.log(req.body.userId) fucking non-sense by me
    const files = req.files || []; 
    if (files.length < 1) return next(new ErrorHandler("provide attachement", 400));
    if(files.lenght>5) return next(new ErrorHandler("files cannot be sent more than 5", 400))

    const [chat, me] = await Promise.all([Chat.findById(chatID), User.findById(req.userId, "name")])
    // console.log(me)

    if (!chat) return next(new ErrorHandler("Chat not found", 404))
    

   
    const attachments = []



    const dbMessage = {
        content: "",
        attachments,
        sender: me._id,
        chat: chatID

    };

    const realTimeMessage = { ...dbMessage, sender: { _id: me._id, name: me.name } };

    const message = await Message.create(dbMessage);

    emitEvent(req, NEW_ATTACHMENT, chat.members, {
        message: realTimeMessage,
        chatID
    });

    emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatID })


    return res.status(200).json({
        success: true,
        message
    })
})


const getChatDetails = tryCatch(async (req, res, next) => {
    if (req.query.populate === "true") {
        const chat = await Chat.findById(req.params.id).populate("members", "name avatar").lean();

        if (!chat) return next(new ErrorHandler("chat not found", 404));

        chat.members = chat.members.map((member) => {
            const { _id, name, avatar } = member;
            return ({
                _id,
                name,
                avatar: avatar.url,
            })
        })

        return res.status(200).json({
            success: true,
            chat
        })
    } else {
        const chat = await Chat.findById(req.params.id);
        if (!chat) return next(new ErrorHandler(" chat not found", 404));

        return res.status(200).json({
            success: true,
            chat
        })

    }
})


const renameGroup = tryCatch(async (req, res, next) => {
    const chatID = req.params.id;
    const { name } = req.body;

    const chat = await Chat.findById(chatID);

    if (!chat) return next(new ErrorHandler("chat not found", 404));

    if (!chat.groupChat) return next(new ErrorHandler("This is not a group chat", 400));

    if (chat.creator.toString() !== req.userId.toString()) return next(new ErrorHandler("tu admin hai be...nikal", 403));

    chat.name = name;

    await chat.save();

    return res.status(200).json({
        success: true,
        message: "group name change ho gaya"
    })
})

const deleteChat = tryCatch(async (req, res, next) => {
    const chatID = req.params.id;
    // console.log(typeof chatID)
    const chat = await Chat.findById(chatID);
    // console.log(chat)

    if (!chat) return next(new ErrorHandler("chat not found", 404));

    const members = chat.members;
    if (chat.groupChat && chat.creator.toString() !== req.userId.toString()) return next(new ErrorHandler("you are not allowed to delete chat", 403));


    //delete all messages, attachements from cloudinary
    const messagesWithAttachments=await Message.find({
        chat:chatID,
        attachments:{$exists:true, $ne:[]}
    })

    const publicId=[];

    messagesWithAttachments.forEach(({attachments})=>{
        attachments.forEach(({public_id})=>{
            publicId.push(public_id)
        })
    })

    await Promise.all([
        deleteFilesFromCloudinary(publicId),
        Chat.deleteOne(),
        Message.deleteMany({chat:chatID})
    ])

    emitEvent(req, REFETCH_CHATS, members)
    return res.status(200).json({
        success:true,
        message:"chat deleted successfully"
    })

})


const getMessages=tryCatch(async(req, res, next)=>{
    const chatID=req.params.id;
    const {page=1 }=req.query;
    // console.log(req.query);
    const limit=20;

    const [messages, totalMessagesCount]=await Promise.all([
        Message.find({chat:chatID})
        .sort({createdAt:-1})
        .skip((page-1)*limit)
        .limit(limit)
        .populate("sender","name")
        .lean(),

        Message.countDocuments({chat:chatID})
    ])

    console.log(totalMessagesCount)

    const totalPages=Math.ceil(totalMessagesCount/limit);

        return res.status(200).json({
            success:true,
            messages:messages.reverse(),
            totalPages
        })
})


 

export {
    createGroupChat,
    getMyChats,
    getMyGroups,
    addMembers,
    removeMember,
    leaveGroup,
    sendAttachments,
    getChatDetails,
    renameGroup,
    deleteChat,
    getMessages
}