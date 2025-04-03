import { faker, simpleFaker } from "@faker-js/faker";
import { Chat } from "../models/chatSchema.js";
import { User } from "../models/userSchema.js"
import { Message } from "../models/messageSchema.js";

export const createSingleChats = async (numChats) => {
    try {
        const users = await User.find().select("_id");//keval userId liye hain

        const chatsPromise = [];

        for (let i = 0; i < users.length; i++) {
            for (let j = i + 1; j < users.length; j++) {
                chatsPromise.push(
                    Chat.create({
                        name: faker.lorem.words(2),
                        members: [users[i], users[j]],
                    })
                )
            }
        }
        await Promise.all(chatsPromise)
        console.log("chats created successfully");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
}

export const createGroupChats = async (numChats) => {
    try {
        const users = await User.find().select("_id");//keval userId liye hain

        const chatsPromise = [];

        for (let i = 0; i < numChats; i++) {
            const numMembers = simpleFaker.number.int({ min: 3, max: users.length });
            const members = [];
            for (let i = 0; i < numMembers; i++) {
                const randomIndex = Math.floor(Math.random() * users.length);
                const randomUser = users[randomIndex];

                if (!members.includes(randomUser)) {
                    members.push(randomUser);
                }
            }

            const chat = Chat.create({
                groupChat: true,
                name: faker.lorem.words(1),
                members,
                creator: members[0]
            })
        }
        await Promise.all(chatsPromise)
        console.log("chats created successfully");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
}


export const createMessages = async (numMessages) => {
    try {
        const users = await User.find().select("_id");
        const chats = await Chat.find().select("_id");

        const messagesPromise = [];

        for (let i = 0; i < numMessages; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomChat = chats[Math.floor(Math.random() * chats.length)];

            messagesPromise.push(
                Message.create({
                    chat: randomChat,
                    sender: randomUser,
                    content: faker.lorem.sentence(),
                })
            )


        }
        await Promise.all(messagesPromise);

        console.log("message created successfully");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
}



export const createMessagesInChat = async (chatId, numMessages) => {
    try {
        const users = await User.find().select("_id");

        const messagesPromise = [];

        for (let i = 0; i < numMessages; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];

            messagesPromise.push(
                Message.create({
                    chat: chatId,
                    sender: randomUser,
                    content: faker.lorem.sentence(),
                })
            )


        } 
        await Promise.all(messagesPromise);

        console.log("message created successfully");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
}