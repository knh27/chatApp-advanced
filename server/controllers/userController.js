import mongoose from "mongoose";
import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken"
// import {config} from "dotenv"
import { compare } from "bcryptjs";

import errors from "../middlewares/errors.js";
const {tryCatch, ErrorHandler}=errors;


// config();

export const createAndSendToken=(res, user, code, message)=>{
    const token=jwt.sign({_id:user._id}, process.env.JWT_SECRET);

    return res.status(code).cookie("jwt", token,{
        maxAge:15*24*60*60*1000,
        sameSite:"none",
        httpOnly:true,
        secure:true
    }).json({
        success:true,
        message
    })
}


export const createUser = async (req, res) => {
    const {name, username, password, bio,avatar={public_id:"abcd",url:"abc"}} = req.body;

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


export const login=tryCatch(
    async (req, res, next)=>{
        const{username, password}=req.body;
    
        if(!username || !password) next(new ErrorHandler("username or password missing", 404));
    
        const user=await User.findOne({username}).select("+password");
    
        if(!user)return next(new ErrorHandler("invalid username or password", 404));
        
    
    
        const isMatch=await compare(password, user.password);
        if(!isMatch) return next(new ErrorHandler("invalid username or password", 404))
    
        createAndSendToken(res, user, 200, `welcome back ${user.name}`);
    
    }
)

export const getProfile= tryCatch(
    async (req, res)=>{
        const user=await User.findById(req.userId);
        res.status(200).json({
            success:true,
            data:user
        })
    }
)

export const logout=(req, res)=>{
    return res.status(200).cookie("jwt", "", {
        maxAge:0,
        sameSite:"none",
        httpOnly:true,
        secure:true
    }).json({
        success:true,
        message:"Logged-Out successfully"
    })
}
export const searchUser=(req, res)=>{
    const {name}=req.query

    return res.status(200).json({
        success:true,
        message:name
    })
}








