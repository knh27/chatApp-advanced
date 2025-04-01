import express from "express"
import { connectDB } from "./config/dbConfig.js";
import userRouter from "./routes/userRoute.js";
import chatRouter from "./routes/chatRoute.js";

import errors from "./middlewares/errors.js"
const {errorMiddleware}=errors;//bcz of default export

import cookieParser from "cookie-parser"

connectDB();

const app=express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());


app.get("/", (req, res)=>res.send("hi from server"));

app.use("/user",userRouter )
app.use("/chat",chatRouter )

app.use(errorMiddleware)

app.listen(3000, ()=>{
    console.log("server running on port 3000")
})




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

*/