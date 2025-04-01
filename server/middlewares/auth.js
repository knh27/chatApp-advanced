import jwt  from "jsonwebtoken";
import errors from "./errors.js";
// import { config } from "dotenv";
// config();

const {tryCatch, ErrorHandler}=errors;


//jahan check karna hai ki user logged in hai ya nahi uss route ke pahale isAuthenticated laga dena hai ya phir app mein app.use(isAuthenticated) aur iske baad sare route jahan check authentication required hai

const isAuthenticated=async (req,res, next)=>{

    const token=req.cookies.jwt;
    if(!token) return next(new ErrorHandler("Login to access this route", 401));

    const decodedData=jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedData)
    req.userId=decodedData._id;
    next();
}

export {isAuthenticated}