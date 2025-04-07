import express from "express";
import { connectDB } from "./config/dbConfig.js";
import cookieParser from "cookie-parser";
import http from "http";
import {v4 as uuid} from "uuid";

import { Server } from "socket.io";

import userRouter from "./routes/userRoute.js";
import chatRouter from "./routes/chatRoute.js";

import errors from "./middlewares/errors.js"
const {errorMiddleware}=errors;//bcz of default export


// import createDummyUser from "./seeders/seedUser.js";
// import { createGroupChats, createMessagesInChat, createSingleChats } from "./seeders/seedChat.js";
// import { createGroupChat } from "./controllers/chatController.js";
import adminRouter from "./routes/adminRoutes.js";
import { log } from "console";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/messageSchema.js";

connectDB();

// createDummyUser(10)
// createSingleChats(10);
// createGroupChats(10)

// createMessagesInChat("67ee3bbce9e502e10b7abb2d",50)

const app=express();
const server=http.createServer(app);
const io=new Server(server, {});

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());


app.get("/", (req, res)=>res.send("hi from server"));

app.use("/user",userRouter )
app.use("/chat",chatRouter )
app.use("/admin", adminRouter);


const userSocketIDs=new Map();///currently active users


//one method is to send user in token which is not a safe thing so we will use a middleware that will Authenticate user and then after io will connect

io.use((socket, next)=>{

})

io.on("connection", (socket)=>{
    // console.log("connected ", socket.id);
    const user={
        _id:"asdf",
        name:"Pranav"
    }
    userSocketIDs.set(user._id.toString(), socket.id);
    console.log(userSocketIDs)

    //  socket.on(NEW_MESSAGE, (data)=>{   //101 Switching Protocols
    //     console.log("a user connected : ", data)
    //  })  

    //.on() - event listener....frontend se event ko server catch kiya jo ki NEW_MESSAGE hai
    socket.on(NEW_MESSAGE, async({chatId, members, message})=>{
        const messageForRealTime={
            content:message,
            _id:uuid(),
            sender:{
                _id:user._id,
                name:user.name
            },
            chat:chatId,
            createdAt:new Date().toISOString(),
        }

        const messageForDB={
            content:message,
            sender:user._id,
            chat:chatId,
        }

        const membersSocket=getSockets(members)
        io.to(membersSocket).emit(NEW_MESSAGE, {//backend se emit kiya NEW_MESSAGE jo ki frontend catch karega
            chatId,
            message:messageForRealTime,
        })

        io.to(membersSocket).emit(NEW_MESSAGE_ALERT, {chatId});

        await Message.create(messageForDB);
        console.log("New Message", messageForRealTime);
        
    })


    socket.on("disconnect", ()=>{
        console.log("User Disconnected", socket.id);
        userSocketIDs.delete(user._id.toString());
        
    })
})


app.use(errorMiddleware)

server.listen(3000, ()=>{
    console.log(`server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

// app.listen(3000, ()=>{
//     console.log(`server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
// })




/*
default export like this is correct but it doesnot allow destructuring in import like this

export default {
    errorMiddleware
}
import {errorMiddleware} from "./middlewares/errors.js

 do it like -
 import errors from "./middlewares/errors.js"
 const {errorMiddleware}=errors;

 or better to export like this if you want to destructure while importing

 export {
    errorMiddleware
 }





 error handling:-
 make a error middleware that is provided by express and call it in last  in route and use in app.use in last
 if want to use try catch
 try{
 
 }catch(err){
    next(err)
 }


 
If next(err) is called
If an error is passed into next(), Express skips all normal middleware and jumps directly to an error-handling middleware.

next(err) bypasses normal middleware and goes straight to the error-handling middleware.
Error-handling middleware must be defined at the end of all routes.



@4:10:00 - part-2 

*/





export {
    userSocketIDs
}